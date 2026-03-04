import { forwardRef } from 'react';
import QRCode from 'react-qr-code';
import { APP_CONFIG } from '../config/appConfig';

interface MadrassaRowValues {
  [key: string]: string | number | null | undefined;
}

interface MadrassaPosterProps {
  data: MadrassaRowValues[];
  headers: string[];
  sheetTitle?: string;
}

const MadrassaPosterMaker = forwardRef<HTMLDivElement, MadrassaPosterProps>(
  ({ data, headers, sheetTitle = "Madrassa Database Records" }, ref) => {

    const ROWS_PER_PAGE = 13;
    const totalPages = Math.ceil(data.length / ROWS_PER_PAGE) || 1;
    
    // Segregate raw data array into strictly controlled pagination chunks
    const pageChunks = [];
    for (let i = 0; i < totalPages; i++) {
        pageChunks.push(data.slice(i * ROWS_PER_PAGE, (i + 1) * ROWS_PER_PAGE));
    }

    return (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', width: '100%' }}>
        {pageChunks.map((chunkData, pageIndex) => (
          <div
            key={pageIndex}
            className="a4-page-container"
            style={{
              width: '794px', 
              height: '1123px', // Strictly enforced height for perfect A4 bounds natively
              backgroundColor: '#ffffff',
              padding: '40px',
              fontFamily: "'Inter', 'Arial', sans-serif",
              color: '#1e293b',
              boxSizing: 'border-box',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between', // Guarantees footer pins perfectly to edge layout
              overflow: 'hidden'
            }}
          >
            {/* Top Container wrapping Header and Table */}
            <div>
              <div style={{ 
                textAlign: 'left', 
                marginBottom: '30px', 
                borderBottom: '3px solid #cbd5e1', 
                paddingBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px'
              }}>
                {APP_CONFIG.branding?.logo && (
                  <img 
                    src={APP_CONFIG.branding.logo.src} 
                    alt="Logo" 
                    style={{ maxHeight: '90px', maxWidth: '140px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                  />
                )}
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#1e293b',
                    margin: '0 0 5px 0',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    lineHeight: '1.2'
                  }}>
                    {APP_CONFIG.institution?.nameEnglish || 'Institution Name'}
                  </h1>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#475569',
                    margin: '0 0 10px 0',
                    direction: 'rtl',
                    fontFamily: "'Amiri', 'Arial', serif",
                    lineHeight: '1.4'
                  }}>
                    {APP_CONFIG.institution?.nameArabic || 'اسم المؤسسة'}
                  </h2>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '15px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {sheetTitle}
                </h3>

                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px', 
                  border: '2px solid #cbd5e1',
                  tableLayout: 'fixed', 
                }}>
                  <thead style={{ display: 'table-header-group' }}>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      {headers.map((headerText, index) => (
                        <th key={index} style={{
                          padding: '12px 10px',
                          border: '1px solid #cbd5e1',
                          fontWeight: '700',
                          color: '#1e293b',
                          textAlign: 'left',
                          wordBreak: 'break-word',
                        }}>
                          {headerText}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chunkData.map((row, rowIndex) => (
                      <tr key={rowIndex} style={{
                        backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f8fafc',
                        pageBreakInside: 'avoid',
                      }}>
                        {headers.map((key, colIndex) => {
                          const rowVal = row[key];
                          return (
                            <td key={`${rowIndex}-${colIndex}`} style={{
                              padding: '10px 8px',
                              border: '1px solid #e2e8f0',
                              color: '#334155',
                              wordBreak: 'break-word', 
                              overflow: 'hidden',
                            }}>
                              {rowVal === null || rowVal === undefined ? '-' : String(rowVal)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {chunkData.length === 0 && (
                      <tr style={{ backgroundColor: '#ffffff' }}>
                        <td colSpan={headers.length} style={{
                           padding: '25px',
                           textAlign: 'center',
                           color: '#94a3b8',
                           border: '1px solid #e2e8f0',
                        }}>
                          No data mapped or data is empty for this class...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Pinned Footer */}
            <div style={{
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '2px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: '#94a3b8',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span>Generated: {new Date().toLocaleDateString()}</span>
                <span style={{ fontWeight: 'bold' }}>Page {pageIndex + 1} of {totalPages}</span>
              </div>
              
              {APP_CONFIG.branding?.printFooterUrl && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontWeight: '500' }}>
                  <QRCode value={APP_CONFIG.branding.printFooterUrl} size={36} level="L" />
                  <span style={{ fontSize: '13px' }}>{APP_CONFIG.branding.printFooterUrl}</span>
                </div>
              )}

              <div>{APP_CONFIG.branding?.fullPortalName || ''}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

MadrassaPosterMaker.displayName = 'MadrassaPosterMaker';

export default MadrassaPosterMaker;
