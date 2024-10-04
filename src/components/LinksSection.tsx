import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export function LinksSection() {
  const links = [
    { name: 'github', url: 'https://github.com/Dawgyy' },
    { name: 'email', url: 'mailto:gerardalexpro@gmail.com' },
    {
      name: 'linkedIn',
      url: 'https://www.linkedin.com/in/alex-gerard-46b201295/',
    },
    { name: 'x.com', url: 'https://x.com/dxwgyy' },
    { name: 'site', url: 'https://dev.dawgy.org' },
  ];

  const infos: { name: string }[] = [];

  return (
    <div>
      <h3 className="text-2xl font-bold mt-6 text-white mb-6 mt-10">links</h3>
      <section className="flex flex-wrap justify-between gap-8">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <span>{link.name}</span>
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
          </a>
        ))}

        {infos.map((info, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{info.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
