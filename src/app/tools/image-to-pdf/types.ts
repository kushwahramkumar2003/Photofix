export interface ConversionOptions {
    pageSize: 'A4' | 'Letter' | 'Legal';
    orientation: 'portrait' | 'landscape';
    margin: number;
    quality: number;
  }
  
  export interface PdfPreviewProps {
    url: string;
    pdfSize: number | null;
    fileName: string;
  }
  
  //eslint-disable-next-line
  export interface ImageToPdfFormProps {}
  
  export interface ConversionOptionsProps {
    options: ConversionOptions;
    setOptions: React.Dispatch<React.SetStateAction<ConversionOptions>>;
    onConvert: () => Promise<void>;
    isConverting: boolean;
    showPreview: boolean;
  }
  
  