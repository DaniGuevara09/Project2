package co.edu.co.project2.logic;

public class Category {
    private String name;
    private int budget;
    private int maxBudget;

    public Category() {
    }

    public Category(String name, int budget, int maxBudget) {
        this.name = name;
        this.budget = budget;
        this.maxBudget = maxBudget;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public int getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(int maxBudget) {
        this.maxBudget = maxBudget;
    }
}
