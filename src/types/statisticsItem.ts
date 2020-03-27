import StatisticsError from "@/types/statisticsError";
import StatisticsTicket from "@/types/statisticsTicket";

export default interface StatisticsItem {
  id: string;
  averageAwaitingTime: number;
  activeWorkPlacesCount: number;
  completedTicketsCount: number;
  pendingTicketsCount: number;
  errors: StatisticsError[];
  completedTickets: StatisticsTicket[];
}