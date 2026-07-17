import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  error?: string;
};

export default function InputField({
  label,
  value,
  placeholder,
  onChangeText,
  error,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
  value={value}
  placeholder={placeholder}
  placeholderTextColor={colors.textTertiary}
  selectionColor={colors.primary}
  onChangeText={onChangeText}
  style={[
    styles.input,
    error && styles.inputError,
  ]}
/>

{error && (
  <Text style={styles.errorText}>
    {error}
  </Text>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    ...typography.label,
  },

  input: {
    height: 52,
    paddingHorizontal: spacing.md,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,

    backgroundColor: colors.surface,
    color: colors.textPrimary,

    ...typography.body,
  },

  inputError: {
    borderColor: colors.error,
  },
  
  errorText: {
    marginTop: spacing.xs,
    color: colors.error,
    ...typography.caption,
  },
});