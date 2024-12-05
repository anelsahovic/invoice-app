import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { formatCurrency, formatDate } from '@/app/utils/helperFunctions';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceNumber: true,
      invoiceName: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      recipientName: true,
      recipientEmail: true,
      recipientAddress: true,
      date: true,
      dueDate: true,
      invoiceDescription: true,
      invoiceQuantity: true,
      invoiceRate: true,
      total: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.setFont('helvetica');
  // Add Colors
  const primaryColor: [number, number, number] = [45, 154, 119];
  const secondaryColor: [number, number, number] = [240, 240, 240];
  const textColor: [number, number, number] = [40, 40, 40];
  const labelColor: [number, number, number] = [100, 100, 100];

  // Header with "InvoiceApp" and Today's Date
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, 210, 30, 'F'); // Blue background for header

  // Header Text left section
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255); // White text for header
  pdf.text('Invoice Report', 20, 20);

  // Add "InvoiceApp" and Today's Date on the right
  const todayDate = formatDate(new Date());
  pdf.setFontSize(12);
  pdf.text('InvoiceApp', 150, 15);
  pdf.text(todayDate, 150, 20);

  pdf.setFontSize(12);
  pdf.setTextColor(255, 255, 255);
  pdf.text('github.com/anelsahovic', 150, 27);

  pdf.link(150, 23, 50, 5, {
    url: 'https://github.com/anelsahovic',
  });

  // Details Section - Add extra spacing between labels and data
  pdf.setFontSize(20);
  pdf.setTextColor(...primaryColor);
  pdf.text(data.invoiceName, 20, 40);

  // Section Divider
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.line(20, 45, 190, 45);

  // Details content with labels and data
  pdf.setFontSize(14);
  pdf.setTextColor(...primaryColor);
  pdf.text('Details', 20, 55);

  pdf.setFontSize(12);
  pdf.setTextColor(...labelColor);
  pdf.text(`Invoice Number:`, 20, 60);
  pdf.setTextColor(...textColor);
  pdf.text(data.invoiceNumber.toString() || 'N/A', 60, 60);

  pdf.setTextColor(...labelColor);
  pdf.text(`Date:`, 20, 65);
  pdf.setTextColor(...textColor);

  pdf.text(formatDate(data.date), 60, 65);
  pdf.setTextColor(...labelColor);
  pdf.text(`Due Date:`, 20, 70);
  pdf.setTextColor(...textColor);
  pdf.text(data.dueDate.toString() || 'N/A', 60, 70);

  // From person details section
  const fromSectionY = 85;
  pdf.setFontSize(16);
  pdf.setTextColor(...primaryColor);
  pdf.text('From:', 20, fromSectionY);

  pdf.setFontSize(12);
  pdf.setTextColor(...labelColor);
  pdf.text(`Name: ${data.fromName || 'N/A'}`, 20, fromSectionY + 5);
  pdf.text(`Email: ${data.fromEmail || 'N/A'}`, 20, fromSectionY + 10);
  pdf.text(`Address: ${data.fromAddress || 'N/A'}`, 20, fromSectionY + 15);

  // Recipient person details section
  const toSectionY = fromSectionY + 30;
  pdf.setFontSize(16);
  pdf.setTextColor(...primaryColor);
  pdf.text('To:', 20, toSectionY);

  pdf.setFontSize(12);
  pdf.setTextColor(...labelColor);
  pdf.text(`Name: ${data.recipientName || 'N/A'}`, 20, toSectionY + 5);
  pdf.text(`Email: ${data.recipientEmail || 'N/A'}`, 20, toSectionY + 10);
  pdf.text(`Address: ${data.recipientAddress || 'N/A'}`, 20, toSectionY + 15);

  // Table Section
  const columnXPositions = {
    description: 30,
    quantity: 115,
    rate: 145,
    total: 180,
  };

  // Table Header with Background Color
  pdf.setFillColor(...secondaryColor);
  pdf.rect(20, 150, 170, 10, 'F');

  // Table Header Text
  pdf.setFontSize(12);
  pdf.setTextColor(...primaryColor);
  pdf.text('Description', columnXPositions.description, 158);
  pdf.text('Quantity', columnXPositions.quantity, 158, { align: 'right' });
  pdf.text('Rate', columnXPositions.rate, 158, { align: 'right' });
  pdf.text('Total', columnXPositions.total, 158, { align: 'right' });

  // Table Data
  pdf.setFontSize(12);
  pdf.setTextColor(...textColor);
  pdf.text(data.invoiceDescription || 'N/A', columnXPositions.description, 168);
  pdf.text(
    String(data.invoiceQuantity || '0'),
    columnXPositions.quantity,
    168,
    { align: 'right' }
  );

  const formattedRate = formatCurrency(
    data.invoiceRate || 0,
    data.currency || 'USD'
  );
  pdf.text(formattedRate, columnXPositions.rate, 168, { align: 'right' });

  const formattedTotal = formatCurrency(
    data.total || 0,
    data.currency || 'USD'
  );
  pdf.text(formattedTotal, columnXPositions.total, 168, { align: 'right' });

  // Add separator line
  pdf.setDrawColor(200, 200, 200); // Lighter separator line
  pdf.setLineWidth(0.3);
  pdf.line(20, 175, 190, 175);

  // Total Section (Right-aligned and with bold font)
  const totalAmountText = `Total (${data.currency?.toUpperCase()}): ${formatCurrency(
    data.total || 0,
    data.currency || 'USD'
  )}`;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...textColor);
  pdf.text(totalAmountText, 190, 190, { align: 'right' });

  //Note section
  const noteSectionY = 210; // Y Position for Note
  if (data.note) {
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text('Note:', 20, noteSectionY);

    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    pdf.text(data.note, 20, noteSectionY + 5, { maxWidth: 170 });
  }

  // Signature line and text
  pdf.setDrawColor(...textColor);
  pdf.setLineWidth(0.3);
  pdf.line(140, 265, 180, 265);
  pdf.setFontSize(12);
  pdf.setTextColor(...textColor);
  pdf.text('Signature', 150, 270);

  // Footer Separator
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.2);
  pdf.line(20, 280, 190, 280);

  // Footer - Thank you note
  pdf.setFontSize(10);
  pdf.setTextColor(...labelColor);
  pdf.text('Thank you for your business!', 105, 290, { align: 'center' });

  //generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

  // return pdf as download
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    },
  });
}
