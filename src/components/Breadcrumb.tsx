import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/solid';

export function Breadcrumb() {
  const router = useRouter();
  const pathSegments = router.asPath
    .split('/')
    .filter((segment) => segment.length > 0);
  const isSpecialPath = (segment: string) =>
    segment === 'work' || segment === 'projects';

  return (
    <nav className="m-2">
      <ul className="flex items-center text-gray-700 list-none p-0 m-0 text-sm">
        {!pathSegments.includes('blog') &&
          !pathSegments.includes('work') &&
          !pathSegments.includes('projects') && (
            <li>
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Home
              </Link>
            </li>
          )}
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-5 h-5 text-gray-400 mx-1" />
              )}
              {isLast || isSpecialPath(segment) ? (
                <span className="text-gray-500 capitalize font-medium">
                  {segment.replace('-', ' ')}
                </span>
              ) : (
                <Link
                  href={path}
                  className="text-blue-500 hover:text-blue-700 capitalize font-medium"
                >
                  {segment.replace('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
