import StatisticsError from "@/@types/statisticsError";
import StatisticsTicket from "@/@types/statisticsTicket";

export default interface StatisticsItem {
  id: string;
  name: string;
  organizationFullName: string;
  organizationAddress: string;
  completedTicketsCount: number;
  pendingTicketsCount: number;
  lat: number;
  lan: number;
}