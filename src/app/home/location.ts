interface Area {
  ID: string;
  LocalizedName: string;
}

export interface Location {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: Area;
  AdministrativeArea: Area;
}

