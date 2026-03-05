import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#333' },
  header: { borderBottom: 2, borderColor: '#000000', paddingBottom: 20, marginBottom: 20, textAlign: 'center' },
  companyName: { fontSize: 20, fontWeight: 'bold' },
  address: { fontSize: 9, color: '#666', marginTop: 2 },
  title: { textAlign: 'center', backgroundColor: '#fafafa', padding: 8, marginVertical: 15, fontWeight: 'bold', fontSize: 12 },

  grid: { flexDirection: 'row', marginBottom: 20 },
  col: { flex: 1 },
  row: { flexDirection: 'row', marginBottom: 4 },
  label: { width: 85, color: '#888' },
  value: { flex: 1, fontWeight: 'bold' },

  table: { border: '1pt solid #eee', borderRadius: 4 },
  tableRow: { flexDirection: 'row', borderBottom: '1pt solid #eee', minHeight: 25, alignItems: 'center' },
  tableHeader: { backgroundColor: '#f5f5f5', fontWeight: 'bold' },
  td1: { width: '70%', paddingLeft: 10 },
  td2: { width: '30%', paddingRight: 10, textAlign: 'right' },
  logo: { width: "50px", height: "50px", position: 'absolute', left: 0 },

  netPaySection: { marginTop: 20, padding: 12, backgroundColor: '#1890ff', color: '#fff', flexDirection: 'row', justifyContent: 'space-between' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#aaa', borderTop: '0.5pt solid #eee', paddingTop: 10 },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

const PayslipPDF = ({ data }) => {
  // Use Intl for number grouping, but manually append "INR"
  const formatINR = (val) => {
    const num = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val || 0);
    return `INR ${num}`;
  };

  const earnings = parseFloat(data.basic || 0) + parseFloat(data.hra || 0) + parseFloat(data.allowance || 0);
  const deductions = parseFloat(data.tax || 0) + parseFloat(data.pf || 0);
  const netPay = earnings - deductions;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={"/pay-slip-gen/logo.png"} style={styles.logo} />
          <Text style={styles.companyName}>{data.companyName || "Company Name"}</Text>
          <Text style={styles.address}>{data.companyAddress || "Full Address Details"}</Text>
        </View>

        <Text style={styles.title}>Salary Statement for {data.month}</Text>

        <View style={styles.grid}>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Employee:</Text><Text style={styles.value}>{data.employeeName}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Employee ID:</Text><Text style={styles.value}>{data.employeeId}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Designation:</Text><Text style={styles.value}>{data.designation}</Text></View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Bank A/C:</Text><Text style={styles.value}>{data.bankAccount}</Text></View>
            <View style={styles.row}><Text style={styles.label}>PAN:</Text><Text style={styles.value}>{data.pan}</Text></View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}><Text style={styles.td1}>Description</Text><Text style={styles.td2}>Amount</Text></View>
          <View style={styles.tableRow}><Text style={styles.td1}>Basic Salary</Text><Text style={styles.td2}>{formatINR(data.basic)}</Text></View>
          <View style={styles.tableRow}><Text style={styles.td1}>HRA</Text><Text style={styles.td2}>{formatINR(data.hra)}</Text></View>
          <View style={styles.tableRow}><Text style={styles.td1}>Tax Deducted (TDS)</Text><Text style={styles.td2}>{formatINR(data.tax)}</Text></View>
          <View style={styles.tableRow}><Text style={styles.td1}>Provident Fund</Text><Text style={styles.td2}>{formatINR(data.pf)}</Text></View>
        </View>

        <View style={styles.netPaySection}>
          <Text style={{ fontWeight: 'bold' }}>Net Amount Payable</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{formatINR(netPay)}</Text>
        </View>

        <Text style={styles.footer}>Computer generated document. No signature required.</Text>
      </Page>
    </Document>
  );
};

export default PayslipPDF;