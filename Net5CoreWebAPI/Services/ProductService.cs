using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Net5CoreWebAPI.Models;

namespace Net5CoreWebAPI.Services
{
    public class ProductService
    {
        private readonly ApplicationContext _context;

        public ProductService(ApplicationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Task<List<Product>> GetProductsAsync()
        {
            return _context.Products.ToListAsync();
        }

        public Task<Product> GetProductAsync(int id)
        {
            return _context.Products.SingleOrDefaultAsync(p => p.ProductId == id);
        }

        public Product Create(Product product)
        {
            _context.Products.AddAsync(product);
            _context.SaveChangesAsync();
            return product;
        }

        public bool Delete(int id)
        {
            var product = _context.Products.SingleAsync(item => item.ProductId == id).Result;

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            _context.SaveChangesAsync();
            
            return true;
        }

        public Product Update(Product product)
        {
            _context.Products.Update(product);
            _context.SaveChangesAsync();
            return product;
        }
    }
}