import SectionRenderer from '../sections/SectionRenderer'
import { FaGraduationCap, FaBriefcase, FaCode, FaProjectDiagram } from 'react-icons/fa'

const MinimalistClean = ({ resumeData, colors, sectionDesign }) => {
  return (
    <div className="min-h-screen bg-white p-12 max-w-3xl mx-auto print:min-h-0 print:p-8">
      {/* Header - No Photo */}
      <div className="text-center mb-12 border-b-2 border-gray-300 pb-8 overflow-hidden">
        <h1 className="text-5xl font-light text-gray-800 mb-4">
          {resumeData.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 px-4 break-words">
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
      
      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <SectionRenderer title="Skills" design={sectionDesign} colors={colors} icon={<FaCode className="text-xl" />}>
          <div className="space-y-1">
            {resumeData.skills.map((skill, index) => {
              const skillText = typeof skill === 'string' ? skill : skill.text || skill
              return (
                <div key={index} className="text-gray-700">
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
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-normal text-gray-800">{edu.degree}</h3>
                {edu.year && <span className="text-sm text-gray-600">{edu.year}</span>}
              </div>
              <p className="text-gray-600">{edu.school}</p>
              {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </SectionRenderer>
      )}
      
      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <SectionRenderer title="Experience" design={sectionDesign} colors={colors} icon={<FaBriefcase className="text-xl" />}>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-normal text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                </div>
                {exp.startDate && (
                  <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                )}
              </div>
              {exp.description && (
                <div 
                  className="text-gray-700 prose prose-sm max-w-none leading-relaxed"
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
            <div key={index} className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-normal text-gray-800">{project.name}</h3>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm">{project.technologies}</p>
                  )}
                  {project.date && (
                    <span className="text-sm text-gray-600">{project.date}</span>
                  )}
                </div>
              </div>
              {project.description && (
                <div 
                  className="text-gray-700 prose prose-sm max-w-none leading-relaxed mb-2"
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
  )
}

export default MinimalistClean

