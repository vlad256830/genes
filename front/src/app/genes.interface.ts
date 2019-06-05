export interface Genes {
  id: number;
  gene_name: string;
  category: string;
  urls: string;
  comments: string;
  description: string;
  rsids: string[];
}

export interface Gene {
  id: number;
  gene_name: string;
  category: string;
  urls: string;
  comments: string;
  description: string;
}

export interface Rsid {
  id: number;
  rsid: string;
  category: string;
  minor_allele: string;
  major_allele: string;
  risk_allele: string;
  links: string;
  txt_minor: string;
  txt_major: string;
  gene_id: number;
  gene_name: string;
}

export interface NewRsid {
  rsid: string;
  category: string;
  minor_allele: string;
  major_allele: string;
  risk_allele: string;
  links: string;
  txt_minor: string;
  txt_major: string;
  gene_id: number;
}

export interface Risk {
  id: number;
  rsid: string;
  group_id: number;
  risk: string;
}

export interface Group {
  id: number;
  group: string;
}
