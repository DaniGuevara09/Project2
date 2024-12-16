package co.edu.co.project2.logic;

public class BudgetData {
    private String date;
    private int totalBudget;

    public BudgetData(String date, int totalBudget) {
        this.date = date;
        this.totalBudget = totalBudget;
    }

    public String getDate() {
        return date;
    }

    public double getTotalBudget() {
        return totalBudget;
    }
}
