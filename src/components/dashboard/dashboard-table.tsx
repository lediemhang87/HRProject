import React, { useState } from 'react';
import ProgressBar from '../progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
interface Employee {
  id: number;
  name: string;
}

interface Project {
  projectName: string;
  projectLead: number;
  process: number;
  assignee: number[];
  status: string;
  due: string; // Update the type to string
}

interface ActiveProjectsTableProps {
  employees: string[];
  activeProjects: Project[];
}

const ActiveProjectsTable: React.FC<ActiveProjectsTableProps> = ({ employees, activeProjects }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Project>('projectName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < activeProjects.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const handleSort = (column: keyof Project) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const getEmployeeName = (position: number): string => {
    if (position >= 0 && position < employees.length) {
      return employees[position];
    }
    return '';
  };

  const capitalizeFirstChar = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const sortedProjects = [...activeProjects].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === 'due') {
      const dateA = new Date(a.due);
      const dateB = new Date(b.due);

      if (dateA < dateB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    }

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleProjects = sortedProjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <table>
        <thead className='table-tile'>
          <tr>
            <th onClick={() => handleSort('projectName')}>
              Project Name {sortColumn === 'projectName' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>

            <th onClick={() => handleSort('projectLead')}>
              Project Lead {sortColumn === 'projectLead' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>

            <th onClick={() => handleSort('process')}>
              Process {sortColumn === 'process' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>

            <th onClick={() => handleSort('assignee')}>
              Assignee {sortColumn === 'assignee' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>

            <th onClick={() => handleSort('status')}>
              Status {sortColumn === 'status' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>

            <th onClick={() => handleSort('due')}>
              Due {sortColumn === 'due' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
          </tr>
        </thead>

        <tbody>
          {visibleProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectName}</td>
              <td>
                <div className='d-flex'>
                <img
                    src={`https://xsgames.co/randomusers/assets/avatars/male/${project.projectLead}.jpg`}
                    alt={`Avatar ${project.projectLead + 1}`}
                    className="normal-avatar"
                />
                {getEmployeeName(project.projectLead)}

                </div>
              </td>
              
              <td><ProgressBar percentage={project.process} /></td>
              <td>
                <div className='d-flex'>
                    {project.assignee.map((position, assigneeIndex) => (
                        <img
                            key={assigneeIndex}
                            src={`https://xsgames.co/randomusers/assets/avatars/male/${position}.jpg`}
                            alt={`Avatar ${assigneeIndex + 1}`}
                            className="avatar "
                        />
                        ))}
                </div>
                
              </td>
              <td >
                <div className={project.status}>
                  {capitalizeFirstChar(project.status)}
                </div>
              </td>
              <td>{new Date(project.due).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='d-flex align-items-center'>
        <div>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedProjects.length)} of {sortedProjects.length} entries
        </div>

        <div className='choose-page '>
          <button onClick={handlePrev} disabled={startIndex === 0}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            
            <button key={i} onClick={() => handlePageClick(i + 1)} disabled={currentPage === i + 1} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={startIndex + itemsPerPage >= sortedProjects.length}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectsTable;
