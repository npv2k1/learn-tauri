import { useState, useEffect } from 'react';

// A custom hook that takes a file name as an argument and returns its content as a string
export function useReadme(fileName: string) {
  // Initialize the state for the file content
  const [content, setContent] = useState('');

  // Use useEffect to fetch the file content when the component mounts or the file name changes
  useEffect(() => {
    // Define a function to get the file URL using dynamic import
    function getFileUrl() {
      // Return a promise that resolves to the file URL
      return import(fileName).then((res) => res.default as string);
    }

    // Define an async function to fetch the file content
    async function fetchReadme() {
      try {
        // Get the file URL using the getFileUrl function
        const fileUrl = await getFileUrl();

        // Use the fetch API to get the file response
        const response = await fetch(fileUrl);

        // Check if the response is ok
        if (response.ok) {
          // Get the file content as text
          const text = await response.text();

          // Update the state with the file content
          setContent(text);
        } else {
          // Throw an error if the response is not ok
          throw new Error(`Failed to fetch ${fileName}`);
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }

    // Call the async function
    fetchReadme();
  }, [fileName]); // Add fileName as a dependency

  // Return the file content as the hook output
  return [content];
}

