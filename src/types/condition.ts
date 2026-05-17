/** Pre-existing condition selected during sign-up (NIH Clinical Tables). */
export interface PreExistingCondition {
  /** NIH condition code from Clinical Tables. */
  id: string;
  name: string;
  icd10: string;
}
