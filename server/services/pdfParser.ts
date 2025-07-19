/**
 * Parses a PDF buffer and extracts the raw text content
 * @param buffer - The PDF file buffer
 * @returns Promise<string> - The extracted text content
 */
export async function parseJobDescription(buffer: any): Promise<string> {
  try {
    // Convert buffer to string for simple text extraction
    const bufferString = buffer.toString('utf8');
    
    // Simple regex to extract text content from PDF
    // This is a basic approach that works for simple PDFs
    const textMatches = bufferString.match(/\(([^)]+)\)/g);
    
    if (!textMatches || textMatches.length === 0) {
      // Fallback: try to extract any readable text
      const readableText = bufferString
        .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      if (readableText.length > 0) {
        console.log(`PDF parsed successfully: ${readableText.length} characters (fallback method)`);
        return readableText;
      }
      
      throw new Error('No text content found in PDF');
    }
    
    // Extract text from matches and clean up
    const extractedText = textMatches
      .map(match => match.slice(1, -1)) // Remove parentheses
      .join(' ')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Basic validation - ensure we got some content
    if (!extractedText || extractedText.length === 0) {
      throw new Error('No text content found in PDF');
    }
    
    console.log(`PDF parsed successfully: ${extractedText.length} characters`);
    
    return extractedText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates if a file is a PDF based on its buffer
 * @param buffer - The file buffer
 * @returns boolean - True if it appears to be a PDF
 */
export function validatePDFBuffer(buffer: any): boolean {
  // Check for PDF magic number (%PDF)
  const pdfHeader = buffer.toString('ascii', 0, 4);
  return pdfHeader === '%PDF';
} 