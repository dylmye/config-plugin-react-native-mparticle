import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MParticle from 'react-native-mparticle';

export default function App() {
  const [session, setSession] = useState<any>({});
  const [attributes, setAttributes] = useState<any>({
    value: 'no attributionResults',
  });

  useEffect(() => {
    MParticle.getSession(sessionId => {
      setSession(sessionId);
    });
    MParticle.getAttributions(attr => {
      setAttributes(attr);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Session ID</Text>
      <Text>{JSON.stringify(session, null, 2)}</Text>
      <Text style={{ fontWeight: "bold" }}>User Attributes</Text>
      <Text>{JSON.stringify(attributes, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
