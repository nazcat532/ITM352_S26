<FormField
  control={form.control}
  name="pin"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Verification Code</FormLabel>
      <FormControl>
        <InputOTP maxLength={6} {...field}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <FormDescription>
        Enter the 6-digit code sent to your email.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>