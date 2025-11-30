
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useReactToPrint } from 'react-to-print'
import { resumeService } from '../services/api'
import ResumePreview from '../components/ResumePreview'
import { FaEdit, FaDownload, FaSpinner, FaArrowLeft, FaTrash } from 'react-icons/fa'
import html2pdf from 'html2pdf.js'

const ViewResume = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [printing, setPrinting] = useState(false)
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => {
      if (!printRef.current) {
        toast.error('Resume content not loaded yet. Please try again.');
        return null;
      }
      return printRef.current;
    },
    documentTitle: `${resumeData?.personalInfo?.fullName || 'Resume'}_Resume`,
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        body {
          margin: 0;
          padding: 0;
          background: white !important;
        }
        .resume-preview-template {
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          background: white !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      setPrinting(true);
      toast.info('Preparing PDF...');
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    },
    onAfterPrint: () => {
      setPrinting(false);
      toast.success('PDF ready! Please use your browser\'s print dialog to save as PDF.');
    },
    onPrintError: (error) => {
      setPrinting(false);
      console.error('Print error:', error);
      toast.error('Failed to generate PDF. Please try using your browser\'s print function (Ctrl+P).');
    }
  });

  const handleDownloadClick = async (e) => {
    e.preventDefault();
    if (!resumeData || !printRef.current) {
      toast.error('Resume content not ready. Please wait a moment.');
      return;
    }

    try {
      toast.info('Preparing PDF download...');
      
      // Get the resume element
      const element = printRef.current;
      
      // Options for PDF generation
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${resumeData?.personalInfo?.fullName?.replace(/\s+/g, '_') || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          scrollY: 0
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'] 
        }
      };

      // Generate and download PDF
      await html2pdf().set(opt).from(element).save();
      
      toast.success('PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await resumeService.getById(id)
        setResumeData(data)
      } catch (error) {
        toast.error('Failed to load resume. Please try again.')
        console.error('Error fetching resume:', error)
        navigate('/resumes')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchResume()
    }
  }, [id, navigate])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      await resumeService.delete(id)
      toast.success('Resume deleted successfully!')
      navigate('/resumes')
    } catch (error) {
      toast.error('Failed to delete resume. Please try again.')
      console.error('Error deleting resume:', error)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="card text-center">
        <p className="text-gray-600">Resume not found</p>
        <Link to="/resumes" className="btn-primary mt-4 inline-block">
          Back to Resumes
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/resumes" className="btn-secondary inline-flex items-center">
          <FaArrowLeft className="mr-2" />
          Back to Resumes
        </Link>
        <div className="flex space-x-3">
          <Link
            to={`/resumes/${id}/edit`}
            className="btn-primary inline-flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Resume
          </Link>
          <button
            onClick={handleDownloadClick}
            disabled={printing || !resumeData}
            className="btn-primary inline-flex items-center"
          >
            {printing ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Preparing...
              </>
            ) : (
              <>
                <FaDownload className="mr-2" />
                Download PDF
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn-danger inline-flex items-center"
          >
            {deleting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaTrash className="mr-2" />
            )}
            Delete
          </button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden shadow-2xl print:p-0 print:shadow-none" ref={printRef}>
        <ResumePreview 
          resumeData={resumeData} 
          templateId={resumeData.templateId || 'classic-sidebar'}
          colorPaletteId={resumeData.colorPaletteId || 'blue-professional'}
          sectionDesignId={resumeData.sectionDesignId || 'card-modern'}
          fontId={resumeData.fontId || 'default'}
        />
      </div>
    </div>
  )
}

export default ViewResume

