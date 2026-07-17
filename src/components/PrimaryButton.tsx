import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';
  
  import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';
  
  type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
  };
  
  export default function PrimaryButton({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
  }: Props) {
    const isDisabled = disabled || loading;
  
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          disabled: isDisabled,
          busy: loading,
        }}
        disabled={isDisabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && !isDisabled && styles.pressedButton,
          isDisabled && styles.disabledButton,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colors.textInverse}
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              isDisabled && styles.disabledButtonText,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      width: '100%',
      height: 56,
      paddingHorizontal: spacing.lg,
  
      alignItems: 'center',
      justifyContent: 'center',
  
      borderRadius: radius.md,
      backgroundColor: colors.primary,
    },
  
    pressedButton: {
      backgroundColor: colors.primaryPressed,
    },
  
    disabledButton: {
      backgroundColor: colors.disabled,
    },
  
    buttonText: {
      color: colors.textInverse,
      textAlign: 'center',
      ...typography.button,
    },
  
    disabledButtonText: {
      color: colors.disabledText,
    },
  });