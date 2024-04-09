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
});

// Function to strip HTML tags from content
const stripHtmlTags = (html) => {
  if (!html || typeof html !== 'string') return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const PDFDocument = ({ content }) => {
  const strippedContent = stripHtmlTags(content);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>
          {strippedContent}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
