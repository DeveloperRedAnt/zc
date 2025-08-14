export type AddOn = {
  name: string;
  quantity: number;
};

export type SubscriptionData = {
  start_date: string; // format: "DD MMMM YYYY"
  end_date: string; // format: "DD MMMM YYYY"
  type: 'add_on' | 'reguler';
  badge_link: string | null;
  amount: string; // misalnya "Rp 54.293"
  add_on: AddOn | null;
};
