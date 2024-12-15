package co.edu.co.project2.servlets;

import co.edu.co.project2.logic.Category;
import co.edu.co.project2.logic.Expense;
import co.edu.co.project2.persistence.ExpenseDAO;
import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.ArrayList;
import com.google.gson.reflect.TypeToken;

@WebServlet(name = "SvExpense", value = "/SvExpense")
public class SvExpense extends HttpServlet {
    private ExpenseDAO expenseDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        super.init();
        expenseDAO = new ExpenseDAO();
        gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        ArrayList<Expense> expenses = (ArrayList<Expense>) expenseDAO.getAll();
        out.println(gson.toJson(expenses));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LocalDate date = LocalDate.parse(request.getParameter("date"));
        int totalBudget = Integer.parseInt(request.getParameter("totalBudget"));
        boolean isIncome = Boolean.parseBoolean(request.getParameter("isIncome"));
        String description = request.getParameter("description");
        String categoriesJson = request.getParameter("categories");

        Type categoryListType = new TypeToken<ArrayList<Category>>(){}.getType();
        ArrayList<Category> categories = gson.fromJson(categoriesJson, categoryListType);

        Expense expense = new Expense();
        expense.setDate(date);
        expense.setTotalBudget(totalBudget);
        expense.setIncome(isIncome);
        expense.setDescription(description);
        expense.setCategories(categories);

        expenseDAO.save(expense);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Expense saved successfully!");
    }
}