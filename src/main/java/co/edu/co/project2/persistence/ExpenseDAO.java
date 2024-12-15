package co.edu.co.project2.persistence;

import co.edu.co.project2.logic.Category;
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
            MongoDatabase mongoDatabase = mongoClient.getDatabase("budget");
            MongoCollection<Document> collection = mongoDatabase.getCollection("expense");

            FindIterable<Document> it = collection.find();
            for (Document doc : it) {
                Expense expense = new Expense();
                expense.setDate(doc.getString("date")); // Almacena como String
                expense.setTotalBudget(doc.getInteger("totalBudget"));
                expense.setIncome(doc.getBoolean("isIncome"));
                expense.setDescription(doc.getString("description"));

                // Recuperar las categorías
                List<Document> categoriesDocs = (List<Document>) doc.get("categories");
                ArrayList<Category> categories = new ArrayList<>();
                for (Document categoryDoc : categoriesDocs) {
                    Category category = new Category();
                    category.setName(categoryDoc.getString("name"));
                    category.setBudget(categoryDoc.getInteger("budget"));
                    category.setMaxBudget(categoryDoc.getInteger("maxBudget"));
                    categories.add(category);
                }
                expense.setCategories(categories); // Asignar categorías al objeto Expense

                expenses.add(expense);
            }
        }
        return expenses;
    }

    @Override
    public Expense save(Expense expense) {
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase mongoDatabase = mongoClient.getDatabase("budget");
            MongoCollection<Document> collection = mongoDatabase.getCollection("expense");

            // Convertir las categorías a documentos
            List<Document> categoriesDocs = new ArrayList<>();
            for (Category category : expense.getCategories()) {
                Document categoryDoc = new Document("name", category.getName())
                        .append("budget", category.getBudget())
                        .append("maxBudget", category.getMaxBudget());
                categoriesDocs.add(categoryDoc);
            }

            // Crear el documento de Expense
            Document expenseDoc = new Document("date", expense.getDate()) // Almacena la fecha como String
                    .append("totalBudget", expense.getTotalBudget())
                    .append("isIncome", expense.isIncome())
                    .append("description", expense.getDescription())
                    .append("categories", categoriesDocs); // Agregar las categorías

            // Insertar en la base de datos
            collection.insertOne(expenseDoc);
        }
        return expense;
    }

    @Override
    public void close() throws IOException {
        // Implementar lógica de cierre si es necesario
    }
}