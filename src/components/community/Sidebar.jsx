import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  const { communityId } = useParams();

  return (
    <div className="w-64 bg-gray-100 p-4">
      <ul>
        <li>
          <Link to={`/community/${communityId}/chat`} className="block py-2 px-4 hover:bg-gray-200">
            Chats
          </Link>
        </li>
        <li>
          <Link to={`/community/${communityId}/projects`} className="block py-2 px-4 hover:bg-gray-200">
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
