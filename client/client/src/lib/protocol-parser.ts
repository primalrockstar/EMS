export interface ParsedProtocol {
  name: string;
  category: string;
  state: string;
  content: string;
  fileType: string;
}

export async function parseProtocolFile(file: File): Promise<ParsedProtocol> {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  switch (fileExtension) {
    case 'json':
      return parseJsonProtocol(file);
    case 'pdf':
      return parsePdfProtocol(file);
    case 'docx':
      return parseDocxProtocol(file);
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}

async function parseJsonProtocol(file: File): Promise<ParsedProtocol> {
  const text = await file.text();
  try {
    const jsonData = JSON.parse(text);
    return {
      name: jsonData.name || file.name.replace('.json', ''),
      category: jsonData.category || 'unknown',
      state: jsonData.state || '',
      content: JSON.stringify(jsonData, null, 2),
      fileType: 'json',
    };
  } catch (error) {
    throw new Error('Invalid JSON file');
  }
}

async function parsePdfProtocol(file: File): Promise<ParsedProtocol> {
  // For now, we'll just return basic file info
  // In a real implementation, you would use a library like pdf-parse
  return {
    name: file.name.replace('.pdf', ''),
    category: 'unknown',
    state: '',
    content: `PDF file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
    fileType: 'pdf',
  };
}

async function parseDocxProtocol(file: File): Promise<ParsedProtocol> {
  // For now, we'll just return basic file info
  // In a real implementation, you would use a library like mammoth
  return {
    name: file.name.replace('.docx', ''),
    category: 'unknown',
    state: '',
    content: `Word document: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
    fileType: 'docx',
  };
}
