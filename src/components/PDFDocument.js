import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  text: {
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

// Function to translate HTML tags into PDF formatting styles
const translateHtmlToPdfStyles = (html) => {
  if (!html || typeof html !== 'string') return '';
  
  // Define regular expressions for identifying HTML tags
  const boldRegex = /<b>|<strong>/g;
  const italicRegex = /<i>|<em>/g;
  const closeTagRegex = /<\/b>|<\/strong>|<\/i>|<\/em>/g;

  // Apply corresponding PDF formatting styles to HTML tags
  const translatedHtml = html
    .replace(boldRegex, '<text style="fontWeight: bold">')
    .replace(italicRegex, '<text style="fontStyle: italic">')
    .replace(closeTagRegex, '</text>');

  return translatedHtml;
};

const PDFDocument = ({ content }) => {
  const translatedContent = translateHtmlToPdfStyles(content);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>
          {translatedContent}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
