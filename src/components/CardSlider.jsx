import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assicurati di importare Link
import firebase from '../api/FirebaseConfig';

const CardSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await firebase.firestore().collection('projects').get();
        const projectList = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 my-4 mx-4">
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <div className="bg-[#8000ff] bg-opacity-[0.7] rounded-md shadow-md cursor-pointer">
            <img src={project.imageURL} alt={project.title} className="w-full h-64 object-cover mb-2 rounded-t" />
            <div className="p-4">
              <h3 className="text-md text-white text-center mb-1 font-semibold text-gray-800">{project.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardSlider;
