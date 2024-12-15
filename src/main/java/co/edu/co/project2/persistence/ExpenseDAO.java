package co.edu.co.project2.persistence;

import co.edu.co.project2.logic.Expense;
import com.mongodb.ConnectionString;
import com.mongodb.client.*;
import org.bson.Document;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ExpenseDAO implements InterfaceDAO<Expense> {
    private static final String DRIVER = "mongodb+srv://valentinavega01:gonzalez25@cluster0.lh9ui.mongodb.net/budget?retryWrites=true&w=majority&appName=Cluster0";
    private final ConnectionString connectionString;

    public ExpenseDAO() {
        connectionString = new ConnectionString(DRIVER);
    }

    @Override
    public List<Expense> getAll() {
        List<Expense> expenses = new ArrayList<>();

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase mongoDatabase = mongoClient.getDatabase("expenseControl");
            MongoCollection<Document> collection = mongoDatabase.getCollection("expenses");

            FindIterable<Document> it = collection.find();
            for (Document doc : it) {
                Expense expense = new Expense();
                expense.setDate(LocalDate.parse(doc.getString("date")));
                expense.setTotalBudget(doc.getInteger("totalBudget"));
                expense.setIncome(doc.getBoolean("isIncome"));
                expense.setDescription(doc.getString("description"));

                expenses.add(expense);
            }
        }
        return expenses;
    }

    @Override
    public Expense save(Expense expense) {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase mongoDatabase = mongoClient.getDatabase("expenseControl");
            MongoCollection<Document> collection = mongoDatabase.getCollection("expenses");

            Document expenseDoc = new Document("date", expense.getDate().toString())
                    .append("totalBudget", expense.getTotalBudget())
                    .append("isIncome", expense.isIncome())
                    .append("description", expense.getDescription());

            collection.insertOne(expenseDoc);
        }
        return expense;
    }

    @Override
    public void close() throws IOException {

    }
}
