import React from "react";

interface CollaboratorProps {
  name: string;
  imageUrl: string;
  linkedinUrl: string;
  altText: string;
}

export const Collaborator: React.FC<CollaboratorProps> = ({
  name,
  imageUrl,
  linkedinUrl,
  altText,
}) => {
  return (
    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={imageUrl}
        title={name}
        alt={altText}
        className="rounded-full h-7 w-7 md:h-12 md:w-12 lg:h-18 lg:w-18 opacity-70 hover:opacity-100  hover:scale-125  hover:z-10 transition-all duration-200"
      />
    </a>
  );
};
