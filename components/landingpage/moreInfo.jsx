import React, { useState } from "react";

export function MoreInfoModal() {
  const info = [
    {
      title: "What is the purpose of the vocational training application?",
      des: "The application is designed to integrate industry-relevant vocational training into elementary and secondary education curricula. Its goal is to provide students with practical skills and knowledge aligned with current job market demands, fostering career readiness and lifelong learning.",
    },
    {
      title: "What types of vocational skills can students learn through this application?",
      des: "Students can learn a diverse range of industry-relevant skills through the program, including digital literacy and coding, entrepreneurship and financial literacy, mechanical and technical trades, healthcare basics, creative arts such as graphic design and photography, as well as green energy and sustainability practices. These skills are thoughtfully tailored to suit different education levels and align with the specific needs of local industries, ensuring a well-rounded and practical learning experience.",
    },
    {
      title: "How does the application ensure that the training aligns with industry standards?",
      des: "The application is developed in collaboration with industry experts, educational institutions, and vocational training organizations. Regular updates and partnerships ensure the curriculum reflects current trends and job market requirements, integrating certifications or pathways to advanced training programs.",
    },
    {
      title: "How can teachers and schools integrate the application into their existing curriculum?",
      des: "The application provides flexible modules that can be incorporated into the existing curriculum as standalone courses, extracurricular activities, or integrated learning projects. It offers lesson plans, assessment tools, and training resources for teachers, ensuring seamless adoption without disrupting core academic schedules.",
    },
    {
      title: "How can students benefit from vocational training at an early age?",
      des: "Introducing vocational training in elementary and secondary education helps students discover their interests and talents early while building foundational skills for future careers. It enhances critical abilities such as problem-solving, critical thinking, and collaboration, which are essential for personal and professional growth. Vocational training increases employability and prepares students for further education or direct entry into the workforce. Additionally, students can earn certifications or micro-credentials that add significant value to their educational journey, making them better equipped for the demands of the modern job market.",
    },
    {
      title: "What role does Virtual Reality (VR) play in vocational training through the application?",
      des: "Virtual Reality (VR) enhances vocational training by providing immersive, hands-on learning experiences in a simulated environment. It allows students to practice complex tasks, such as operating machinery or performing medical procedures, in a risk-free setting. VR also helps bridge the gap between theory and practice, making learning more engaging and realistic while preparing students for real-world scenarios.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="container mx-auto py-20">
      <div className="mb-10">
        <p className="text-gray-800 text-center text-3xl lg:text-5xl font-semibold">
          Frequently Asked Questions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {info.map((inf, i) => (
          <div key={i} className="group border border-gray-300 rounded-lg p-5 shadow-md">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center w-full text-left text-lg font-medium group-hover:bg-[#524fd5] group-focus:bg-[#524fd5] focus:outline-none p-4 rounded-md"
            >
              <span className="group-hover:text-white group-focus:text-white">
                {inf.title}
              </span>
              <span
                className={`transform text-2xl ${
                  openIndex === i ? "rotate-90" : "rotate-0"
                } group-hover:text-white group-focus:text-white`}
              >
                →
              </span>
            </button>
            {openIndex === i && (
              <div className="px-4 pt-3 pb-2 text-base text-gray-600">
                {inf.des}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
