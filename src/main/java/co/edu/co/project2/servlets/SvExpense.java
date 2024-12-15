package co.edu.co.project2.servlets;

import co.edu.co.project2.logic.Category;
import co.edu.co.project2.logic.Expense;
import co.edu.co.project2.persistence.ExpenseDAO;
import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.BufferedReader;
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
        // Leer el cuerpo de la solicitud como JSON
        StringBuilder jsonBuilder = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }
        }

        // Convertir el JSON recibido a un objeto Expense
        String requestBody = jsonBuilder.toString();
        Expense expense = gson.fromJson(requestBody, Expense.class);

        // Guardar el expense en la base de datos
        expenseDAO.save(expense);

        // Responder con éxito
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Expense saved successfully!");
    }
}