import StatisticsItem from "@/@types/statisticsItem";

export default interface HttpResponse {
  code: number;
  status: string;
  body: StatisticsItem[];
}