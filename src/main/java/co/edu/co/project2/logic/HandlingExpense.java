package co.edu.co.project2.logic;

import java.util.ArrayList;

public class HandlingExpense {
    private ArrayList<Expense> expenses;

    public HandlingExpense() {
        expenses = new ArrayList<>();
    }

    public boolean addExpense(Expense expense) {
        return expenses.add(expense);
    }

    public ArrayList<Expense> getExpenses() {
        return expenses;
    }
}
