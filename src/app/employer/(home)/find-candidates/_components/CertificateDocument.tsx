// components/CertificateDocument.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Optional: Add a nice font (Google Fonts like Roboto)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // Regular
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf",
      fontWeight: 700,
    }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    width: 800,
    height: 600,
    padding: 40,
    fontFamily: "Roboto",
    backgroundColor: "#fff",
    border: "2 solid #2196F3",
    position: "relative",
  },
  header: {
    backgroundColor: "#f9533a",
    height: 50,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    paddingTop: 70,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    color: "#374957",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "#9BA4AB",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 20,
  },
  name: {
    fontSize: 26,
    margin: 10,
    fontWeight: "bold",
    color: "#374957",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginBottom: 10,
  },
  signatureLine: {
    width: 200,
    height: 2,
    backgroundColor: "#D7DBDD",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  ceoName: {
    fontSize: 15,
    color: "#374957",
    fontWeight: 600,
    marginTop: 7,
  },
  signerInfo: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#374957",
  },
});

interface CertificateProps {
  name: string;
  from: string;
  role: string;
  company: string;
  certId: string;
  issueDate: string;
}

export const CertificateDocument = ({
  name,
  role,
  company,
  certId,
  issueDate,
}: CertificateProps) => (
  <Document>
    <Page size={{ width: 800, height: 600 }} style={styles.page}>
      <View style={styles.header} />
      <View style={styles.container}>
        <Image
          src="https://i.ibb.co.com/3mD2BKP2/career-hub-logo1.png"
          style={{ width: 160, height: 70, alignSelf: "center" }}
        />

        <Text style={{ ...styles.title, color: "#f9533a" }}>
          Certificate of Selection
        </Text>
        <Text style={styles.subtitle}>
  This certificate is proudly awarded to
</Text>
<Text style={styles.name}>{name}</Text>
<Text style={styles.description}>
  in recognition of successfully securing the position of {role} at {company} through MeDHr+.
</Text>

        <Image
          src="https://i.ibb.co.com/6J49LW7j/pngwing-com.png"
          style={{ width: 160, height: 40, marginTop: 30, alignSelf: "center" }}
        />

        <View style={styles.signatureLine} />

        <Text style={styles.ceoName}>CEO Name</Text>
        <Text style={styles.signerInfo}>Co Founder</Text>
      </View>
      <View style={styles.footer}>
        <Text>CERTIFICATE-ID: {certId}</Text>
        <Text>DATE OF ISSUE: {issueDate}</Text>
        <Text>Visit www.medhrplus.com</Text>
      </View>
    </Page>
  </Document>
);
