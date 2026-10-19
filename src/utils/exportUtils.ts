/**
 * Export utilities for downloading classroom work as Word-compatible (.doc) or plain text (.txt).
 */

export interface ExportData {
  title: string;
  subtitle?: string;
  date?: string;
  sections: Array<{
    heading: string;
    content: string | Record<string, string | string[]>;
  }>;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}

/**
 * Exports data as a Microsoft Word compatible (.doc) file using clean HTML MIME format.
 */
export function exportToWord(data: ExportData, filename?: string) {
  const today = data.date || new Date().toLocaleDateString('de-DE');
  const safeFilename = (filename || `${data.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_export`).replace(/\.doc$/, '') + '.doc';

  let bodyHtml = `
    <div style="font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; padding: 20px;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 24px;">
        <p style="font-size: 9pt; color: #64748b; margin: 0; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
          Palliative Care III • Modul CE08 U3 • Arbeitsergebnisse
        </p>
        <h1 style="font-size: 20pt; color: #0f172a; margin: 6px 0 4px 0; font-weight: bold;">
          ${escapeHtml(data.title)}
        </h1>
        ${data.subtitle ? `<p style="font-size: 11pt; color: #475569; margin: 0;">${escapeHtml(data.subtitle)}</p>` : ''}
        <p style="font-size: 9pt; color: #94a3b8; margin: 8px 0 0 0;">Erstellt am: ${today} • Nur lokal gespeichert</p>
      </div>
  `;

  for (const section of data.sections) {
    bodyHtml += `
      <div style="margin-bottom: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
        <h2 style="font-size: 13pt; color: #1e40af; margin: 0 0 10px 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">
          ${escapeHtml(section.heading)}
        </h2>
    `;

    if (typeof section.content === 'string') {
      const formatted = escapeHtml(section.content || '(Keine Eingabe vorhanden)').replace(/\n/g, '<br/>');
      bodyHtml += `<div style="font-size: 11pt; color: #0f172a; white-space: pre-wrap;">${formatted}</div>`;
    } else {
      bodyHtml += `<table style="width: 100%; border-collapse: collapse; margin-top: 8px;">`;
      for (const [key, val] of Object.entries(section.content)) {
        const valStr = Array.isArray(val) ? val.join(', ') : val;
        bodyHtml += `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 6px 10px; font-weight: bold; color: #475569; width: 30%; vertical-align: top;">${escapeHtml(key)}</td>
            <td style="padding: 6px 10px; color: #0f172a;">${escapeHtml(valStr || '-').replace(/\n/g, '<br/>')}</td>
          </tr>
        `;
      }
      bodyHtml += `</table>`;
    }

    bodyHtml += `</div>`;
  }

  bodyHtml += `
      <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 8pt; color: #94a3b8; text-align: center;">
        Fachfortbildung Palliative Care • Strafrecht & Patientenverfügung • Lehrunterlagen nach Großkopf & Klein
      </div>
    </div>
  `;

  const wordDocumentHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${escapeHtml(data.title)}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4 portrait;
            margin: 2cm 2cm 2cm 2cm;
          }
          body {
            font-family: Calibri, 'Segoe UI', Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        ${bodyHtml}
      </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordDocumentHtml], {
    type: 'application/msword;charset=utf-8',
  });
  downloadBlob(blob, safeFilename);
}

/**
 * Exports data as a plain text (.txt) file.
 */
export function exportToText(data: ExportData, filename?: string) {
  const today = data.date || new Date().toLocaleDateString('de-DE');
  const safeFilename = (filename || `${data.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_export`).replace(/\.txt$/, '') + '.txt';

  const separator = '='.repeat(70);
  const subSeparator = '-'.repeat(70);

  let text = `${separator}\n`;
  text += `${data.title.toUpperCase()}\n`;
  if (data.subtitle) {
    text += `${data.subtitle}\n`;
  }
  text += `Datum: ${today} | Palliative Care III (CE08 U3)\n`;
  text += `${separator}\n\n`;

  for (const section of data.sections) {
    text += `${section.heading}\n`;
    text += `${subSeparator}\n`;

    if (typeof section.content === 'string') {
      text += `${section.content.trim() || '(Keine Eingabe vorhanden)'}\n\n`;
    } else {
      for (const [key, val] of Object.entries(section.content)) {
        const valStr = Array.isArray(val) ? val.join(', ') : val;
        text += `• ${key}: ${valStr || '-'}\n`;
      }
      text += '\n';
    }
  }

  text += `${separator}\n`;
  text += `Ende des Protokolls\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, safeFilename);
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
