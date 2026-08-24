import React from 'react';
import { Text } from 'react-native';

/** `thenewleaders.` wordmark used at the top of the sign-in step. */
export default function Wordmark() {
  return (
    <Text className="text-[22px] font-extrabold tracking-[-0.99px] text-brand-ink">
      the
      <Text className="text-brand-logo-accent">new</Text>
      leaders
      <Text className="text-brand-logo-accent">.</Text>
    </Text>
  );
}
