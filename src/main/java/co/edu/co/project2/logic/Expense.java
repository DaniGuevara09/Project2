package co.edu.co.project2.logic;

import java.time.LocalDate;
import java.util.ArrayList;

public class Expense {
    private String date;
    private int totalBudget;
    private boolean isIncome; // true = income; false = expense
    private String description;
    private ArrayList<Category> categories;

    public Expense() {
        date=LocalDate.now().toString();
        totalBudget = 0;
        isIncome = false;
        description = "";
        categories = new ArrayList<>();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(int totalBudget) {
        this.totalBudget = totalBudget;
    }

    public boolean isIncome() {
        return isIncome;
    }

    public void setIncome(boolean income) {
        isIncome = income;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<Category> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<Category> categories) {
        this.categories = categories;
    }
}