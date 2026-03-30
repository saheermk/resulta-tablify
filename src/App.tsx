import { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'
import { APP_CONFIG } from './config/appConfig'
import MadrassaPosterMaker from './components/MadrassaPosterMaker'
import Loading from './components/Loading'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './App.css'
import Logo from './assets/logo.svg'

function App() {
  const availableClasses = APP_CONFIG.madrassaSheet.availableClasses || Object.keys(APP_CONFIG.detailedColumns);
  const [selectedClass, setSelectedClass] = useState<string>(availableClasses[0] || 'Class 1');
  const [data, setData] = useState<Record<string, string>[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showPassOnly, setShowPassOnly] = useState(false)
  
  // Calculate responsive scale for the poster
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      // 794px is the native width of A4 container
      const paddingX = window.innerWidth <= 768 ? 20 : 80;
      const availableWidth = window.innerWidth - paddingX;
      if (availableWidth < 794) {
        setScale(availableWidth / 794);
      } else {
        setScale(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // We maintain two refs: one for the visible responsive preview, one for the hidden export version
  const previewRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const institutionName = APP_CONFIG.institution.nameEnglish;

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    const sheetId = APP_CONFIG.madrassaSheet.sheetId
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(selectedClass)}`

    Papa.parse(csvUrl, {
      download: true,
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][];
        if (rows && rows.length > 0) {
          let classConfigObj: Record<string, unknown>;
          
          if (APP_CONFIG.madrassaSheet.simpleResult?.enabled && APP_CONFIG.madrassaSheet.simpleResult.classes.includes(selectedClass)) {
            classConfigObj = {
              serialNo: 0, uid: 1, name: 2, fatherName: 3, status: 4
            };
          } else {
            classConfigObj = APP_CONFIG.detailedColumns[selectedClass as keyof typeof APP_CONFIG.detailedColumns] as Record<string, unknown> || APP_CONFIG.detailedColumns['Class 1'];
          }
          
          const keysToKeep = APP_CONFIG.madrassaSheet.columnsToList.filter(k => classConfigObj[k] !== undefined);
          const uidIndex = classConfigObj['uid'] as number;
          const statusIndex = classConfigObj['status'] as number | undefined;
          
          const sheetHeaders = rows[0];
          const displayHeaders = keysToKeep.map(key => {
             const colIdx = classConfigObj[key] as number;
             return sheetHeaders[colIdx] || key;
          });
          
          const formattedData = rows.slice(1)
             .filter(rowArray => {
                const uidVal = rowArray[uidIndex];
                return uidVal !== undefined && uidVal !== null && uidVal.toString().trim() !== '';
             })
             .map(rowArray => {
                const rowObj: Record<string, string> = {};
                keysToKeep.forEach((key, index) => {
                   const colIdx = classConfigObj[key] as number;
                   const label = displayHeaders[index];
                   rowObj[label] = rowArray[colIdx] || '';
                });
                if (statusIndex !== undefined) {
                   rowObj._status = rowArray[statusIndex] || '';
                }
                return rowObj;
             });
          
          if (active) {
            setData(formattedData);
            setHeaders(displayHeaders);
            setLoading(false);
          }
        } else if (active) {
          setLoading(false);
        }
      },
      error: (error: Error) => {
        if (active) {
          console.error("Error fetching sheet data:", error);
          setLoading(false);
        }
      }
    });

    return () => { active = false; };
  }, [selectedClass])

  const filteredData = showPassOnly ? data.filter(d => d._status?.trim().toUpperCase() === 'PASS') : data;

  // EXPORT LOGIC - TARGETS THE HIDDEN, UN-SCALED DIV
  const handleDownloadPDF = async () => {
    if (!exportRef.current) return;
    
    // Un-hide momentarily (offscreen) to ensure canvas renders correctly
    exportRef.current.style.display = 'block';
    
    const pages = exportRef.current.querySelectorAll('.a4-page-container');
    if (pages.length === 0) {
      exportRef.current.style.display = 'none';
      return;
    }
    
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4', compress: true });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    
    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i] as HTMLElement;
      // We explicitly capture at a higher scale for crisp crispness, referencing the native 794px container
      const canvas = await html2canvas(pageEl, { scale: 1.5, useCORS: true, logging: false }); 
      const imgData = canvas.toDataURL('image/jpeg', 0.8); 
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }
    
    pdf.save(`${institutionName}-${selectedClass}-resulta.pdf`);
    exportRef.current.style.display = 'none'; // Re-hide
  }


  if (loading) return <Loading />

  return (
    <div className="app-container">
      {/* Top Application Bar */}
      <header className="top-bar no-print">
        <div className="brand-section">
          <img src={Logo} alt="Logo" className="logo" height={40}/>
          <p>Madrassa Poster Generator</p>
        </div>

        <div className="controls-group">
          <select 
            className="styled-select"
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {availableClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <label className="toggle-label">
            <div className={`toggle-switch ${showPassOnly ? 'active' : ''}`}>
               <input 
                 type="checkbox" 
                 checked={showPassOnly} 
                 onChange={(e) => setShowPassOnly(e.target.checked)}
                 style={{ display: 'none' }} 
               />
               <div className="toggle-thumb" />
            </div>
            Show PASS Only
          </label>
        </div>

        <div className="actions-group">
          <button className="btn btn-gradient" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Canvas - Visually responsive using CSS Transform strategy */}
      <main className="canvas-area">
        {/* We use explicit transform math to beautifully align the preview cross-browser. 
            The offscreen exportRef handles perfect PNG/PDFs safely. */}
        <div style={{
           width: `${794 * scale}px`,
           transformOrigin: 'top center',
           marginBottom: `-${(1 - scale) * ((Math.ceil(filteredData.length / 13) || 1) * 1173)}px`,
           display: 'flex',
           justifyContent: 'center'
        }} ref={previewRef}>
            <div style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '794px'
            }}>
                <MadrassaPosterMaker 
                  data={filteredData} 
                  headers={headers} 
                  sheetTitle={`Records - ${selectedClass}`} 
                />
            </div>
        </div>
      </main>

      {/* OFFSCREEN RENDER FOR EXPORT */}
      {/* This renders strictly at perfect A4 pixel dimensions and is completely immune to screen resizing. */}
      <div 
        ref={exportRef} 
        style={{ 
          position: 'absolute', 
          top: '-9999px', 
          left: '-9999px', 
          width: '794px', // Absolute strict A4 width
          display: 'none', // Hidden until captured
          backgroundColor: 'white'
        }}
      >
        <MadrassaPosterMaker 
          data={filteredData} 
          headers={headers} 
          sheetTitle={`Records - ${selectedClass}`} 
        />
      </div>

      <style>{`
        @media print {
          body { background-color: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .canvas-area { display: none !important; } /* Hide the responsive preview */
          /* Display the explicit 794px export component for printing natively! */
          #root > div > div:last-of-type {
             display: block !important;
             position: absolute !important;
             top: 0 !important;
             left: 0 !important;
             visibility: visible !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App
