export class Doc {
  id: string;
  m_szDocID: string;
  m_szDocTitle: string;
  m_szYear: string;
  m_szDocSumamry: string;
  m_szDocBody: string;
  m_szGeo1: string;
  m_szSourceType: string;
  m_szSrcUrl: string;
  m_Places: string[];
  m_People: string[];
  m_Companies: string[];
  m_BiGrams: string[];
  m_TriGrams: string[];
  m_SocialTags: string[];
  m_Topics: string[];
  m_Industry: string[];
  m_Technology: string[];
  m_BiCnt: number[];
  m_TriCnt: number[];
  m_iDocBodyWordCnt: number
}
