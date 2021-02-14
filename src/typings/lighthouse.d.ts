declare module 'lighthouse' {
  declare async function lighthouse(
    url,
    flags?: LH.Flags,
    configJSON?: LH.Config.Json,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userConnection?: any,
  ): Promise<LH.RunnerResult | undefined>;
  // eslint-disable-next-line import/no-default-export
  export default lighthouse;
}
