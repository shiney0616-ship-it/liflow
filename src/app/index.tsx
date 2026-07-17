import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Liflow</Text>

      <View style={styles.content}>
        <Text style={styles.title}>당신의 흐름을 읽다</Text>
        <Text style={styles.subtitle}>
          사주와 AI 상담으로{'\n'}
          지금의 나를 더 깊이 이해해보세요.
        </Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>사주 시작하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: '#F8F6F1',
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2F3E36',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 44,
    color: '#1F2A24',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 27,
    color: '#66736C',
  },
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2F5D50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});