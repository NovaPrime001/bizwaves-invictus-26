
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest text-cyan-400 text-center mb-12 relative pb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-cyan-500/50 after:rounded-full">
    {children}
  </h2>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <SectionTitle>About</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left">
          <div className="bg-gray-900/20 p-8 rounded-lg border border-gray-700">
            <h3 className="font-montserrat text-2xl font-bold text-white mb-4">ABOUT BIZWAVES</h3>
            <p className="text-gray-300 leading-relaxed">
              Bizwaves is the annual flagship Management Fest organized by the students of the National Institute of Technology Karnataka (NITK), Surathkal, one of India’s premier technological institutions. The event serves as a dynamic platform for management students to showcase their skills and compete in a variety of challenging domains including finance, marketing, operations, analytics, and human resources.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Held at NITK’s 296-acre campus nestled along the picturesque coastline of Karnataka, Bizwaves brings together students from across the country to engage in intense competition, foster leadership, and develop managerial acumen.
            </p>
          </div>
          <div className="bg-gray-900/20 p-8 rounded-lg border border-gray-700">
            <h3 className="font-montserrat text-2xl font-bold text-white mb-4">ABOUT NITK</h3>
            <p className="text-gray-300 leading-relaxed">
              Established in 1960, National Institute of Technology Karnataka (NITK), Surathkal is among India’s top engineering institutions, ranked among the top 12 in engineering and top 33 overall in NIRF 2023.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              With a vision to transform students into competent professionals and responsible citizens, NITK focuses on knowledge assimilation, generation, and dissemination. The institute is committed to excellence in teaching, research, and learning, ensuring students receive a wellrounded education that nurtures innovation, teamwork, and leadership.
            </p>
          </div>
          <div className="bg-gray-900/20 p-8 rounded-lg border border-gray-700">
            <h3 className="font-montserrat text-2xl font-bold text-white mb-4">ABOUT SHSSM</h3>
            <p className="text-gray-300 leading-relaxed">
              Established in 1989-90, SHSSM initially served as a supporting department for B.Tech programs, offering core and elective courses. Expanding its scope, the school introduced a Master of Business Administration (MBA) program in 2007-08, addressing the growing demand for skilled business professionals. With a strong foundation in social sciences and management, SHSSM continues to provide a well-rounded education that integrates theory, practice, and industry relevance, preparing students for the global business landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
