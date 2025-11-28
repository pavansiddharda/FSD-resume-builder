import SectionRenderer from '../sections/SectionRenderer'
import { FaGraduationCap, FaBriefcase, FaCode, FaProjectDiagram } from 'react-icons/fa'

const ModernHeader = ({ resumeData, colors, sectionDesign }) => {
  return (
    <div className="min-h-screen bg-white print:min-h-0">
      {/* Header with Photo */}
      <div className="text-white p-8 text-center overflow-hidden" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}>
        {resumeData.personalInfo?.photo && (
          <div className="mb-4">
            <img 
              src={resumeData.personalInfo.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">
          {resumeData.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm px-4 break-words">
          {resumeData.personalInfo?.email && (
            <span className="break-all">{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo?.phone && (
            <span className="break-words">{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo?.address && (
            <span className="break-words">{resumeData.personalInfo.address}</span>
          )}
          {resumeData.personalInfo?.linkedin && (
            <span className="break-all max-w-full">{resumeData.personalInfo.linkedin}</span>
          )}
          {resumeData.personalInfo?.website && (
            <span className="break-all max-w-full">{resumeData.personalInfo.website}</span>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <SectionRenderer title="Skills" design={sectionDesign} colors={colors} icon={<FaCode className="text-xl" />}>
            <div className="space-y-1">
              {resumeData.skills.map((skill, index) => {
                const skillText = typeof skill === 'string' ? skill : skill.text || skill
                return (
                  <div key={index} className="text-sm text-gray-700">
                    {skillText}
                  </div>
                )
              })}
            </div>
          </SectionRenderer>
        )}
        
        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <SectionRenderer title="Education" design={sectionDesign} colors={colors} icon={<FaGraduationCap className="text-xl" />}>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <p className="font-medium" style={{ color: colors.primary }}>{edu.school}</p>
                <p className="text-sm text-gray-600">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <SectionRenderer title="Experience" design={sectionDesign} colors={colors} icon={<FaBriefcase className="text-xl" />}>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                <p className="font-medium" style={{ color: colors.primary }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && (
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <SectionRenderer title="Projects" design={sectionDesign} colors={colors} icon={<FaProjectDiagram className="text-xl" />}>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                {project.technologies && (
                  <p className="font-medium text-sm mb-1" style={{ color: colors.accent }}>{project.technologies}</p>
                )}
                {project.date && (
                  <p className="text-sm text-gray-600 mb-1">{project.date}</p>
                )}
                {project.description && (
                  <div 
                    className="text-gray-700 text-sm prose prose-sm max-w-none mb-2"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                    style={{ color: colors.primary }}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Custom Sections */}
        {resumeData.customSections && resumeData.customSections.length > 0 && (
          <>
            {resumeData.customSections.map((section, index) => (
              <SectionRenderer 
                key={index}
                title={section.title} 
                design={sectionDesign}
                colors={colors}
              >
                {section.content && (
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none mb-3"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
                {section.items && section.items.length > 0 && (
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const itemText = typeof item === 'string' ? item : item.text || item
                      return (
                        <div key={itemIndex} className="text-sm text-gray-700">
                          {itemText}
                        </div>
                      )
                    })}
                  </div>
                )}
              </SectionRenderer>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ModernHeader

