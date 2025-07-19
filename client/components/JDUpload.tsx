import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Paperclip, X, FileText, Upload, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface JDUploadProps {
  onJDChange: (jdContent: string | null, fileName?: string) => void;
  onJDAutofill?: (query: string) => void;
  onJDConfirmed?: () => void;
  isCollapsed?: boolean;
  className?: string;
}

export const JDUpload: React.FC<JDUploadProps> = ({ 
  onJDChange, 
  onJDAutofill, 
  onJDConfirmed, 
  isCollapsed = false,
  className = "" 
}) => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [jdText, setJdText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_TEXT_LENGTH = 10000; // 10KB
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const SMART_QUERY = "Based on the attached job description, how is Gaurank Maheshwari the ideal candidate for this role? Please highlight relevant skills, experiences, and adaptability.";

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setJdText(""); // Clear text input
    setShowTextarea(false);
    setIsUploading(true);

    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      onJDChange(file.name, file.name);
      // Trigger autofill with smart query
      if (onJDAutofill) {
        onJDAutofill(SMART_QUERY);
      }
    }, 1000);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= MAX_TEXT_LENGTH) {
      setJdText(text);
      setSelectedFile(null); // Clear file input
      onJDChange(text || null);
      
      // Trigger autofill when text is substantial (more than 50 characters)
      if (text.length > 50 && onJDAutofill) {
        onJDAutofill(SMART_QUERY);
      }
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setJdText("");
    setShowTextarea(false);
    setIsExpanded(false);
    onJDChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Clear autofill when JD is removed
    if (onJDAutofill) {
      onJDAutofill("");
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const hasContent = selectedFile || jdText.trim();

  // If collapsed and no content, don't render anything
  if (isCollapsed && !hasContent) {
    return null;
  }

  // If collapsed but has content, show the collapsed bar
  if (isCollapsed && hasContent) {
    return (
      <div className={`${className}`}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-2 bg-muted/50 rounded-md border border-border/30"
        >
          <Paperclip className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium flex-1">
            {selectedFile ? `📎 ${selectedFile.name}` : "📎 JD Attached"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleExpandClick}
            className="h-6 w-6 p-0"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </Button>
        </motion.div>

        {/* Expanded content when user clicks to expand */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-3"
            >
              {/* File Upload Section */}
              <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAttachClick}
                        disabled={isUploading || (jdText.trim() && !selectedFile)}
                        className="flex items-center gap-2"
                      >
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Paperclip className="w-4 h-4" />
                        )}
                        {isUploading ? "Uploading..." : "📎 Attach JD"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-center p-3">
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Add your job description</p>
                        <p className="text-xs text-muted-foreground">
                          "Let me analyze how I can be the missing piece to your puzzle. 
                          Like a well-crafted algorithm, I'll find the optimal fit!" 🧩✨
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {!showTextarea && !hasContent && (
                  <button
                    type="button"
                    onClick={() => setShowTextarea(true)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    or paste JD here
                  </button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Selected File Display */}
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-2 bg-muted/50 rounded-md"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Text Input Section */}
              <AnimatePresence>
                {showTextarea && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Textarea
                      value={jdText}
                      onChange={handleTextChange}
                      placeholder="Or paste the full job description here..."
                      className="min-h-[120px] resize-none"
                      disabled={!!selectedFile}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {jdText.length} / {MAX_TEXT_LENGTH} characters
                      </span>
                      {jdText.length > MAX_TEXT_LENGTH * 0.9 && (
                        <span className="text-orange-500">
                          Approaching limit
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full expanded view (not collapsed)
  return (
    <div className={`space-y-3 ${className}`}>
      {/* File Upload Section */}
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAttachClick}
                disabled={isUploading || (jdText.trim() && !selectedFile)}
                className="flex items-center gap-2"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Paperclip className="w-4 h-4" />
                )}
                {isUploading ? "Uploading..." : "📎 Attach JD"}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-center p-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">Add your job description</p>
                <p className="text-xs text-muted-foreground">
                  "Let me analyze how I can be the missing piece to your puzzle. 
                  Like a well-crafted algorithm, I'll find the optimal fit!" 🧩✨
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {!showTextarea && !hasContent && (
          <button
            type="button"
            onClick={() => setShowTextarea(true)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            or paste JD here
          </button>
        )}

        {hasContent && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Selected File Display */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-md"
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{selectedFile.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Input Section */}
      <AnimatePresence>
        {showTextarea && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Textarea
              value={jdText}
              onChange={handleTextChange}
              placeholder="Or paste the full job description here..."
              className="min-h-[120px] resize-none"
              disabled={!!selectedFile}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {jdText.length} / {MAX_TEXT_LENGTH} characters
              </span>
              {jdText.length > MAX_TEXT_LENGTH * 0.9 && (
                <span className="text-orange-500">
                  Approaching limit
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JD Received Confirmation */}
      <AnimatePresence>
        {hasContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950/20 p-2 rounded-md"
          >
            <Upload className="w-4 h-4" />
            JD received - ready for analysis
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 