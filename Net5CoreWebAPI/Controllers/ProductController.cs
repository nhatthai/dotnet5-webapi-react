using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Net5CoreWebAPI.Models;
using Net5CoreWebAPI.Services;

namespace Net5CoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ProductService _productService;

        public ProductController(ProductService productService, ILogger<ProductController> logger)
        {
            _logger = logger;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel>> GetProductsAsync([FromQuery] RequestModel requestModel)
        {
            try
            {
                var results = await _productService.GetProductsAsync();
                var enumerable = results.ToList();
                var products = enumerable.Skip(requestModel.PageIndex * requestModel.PageSize)
                    .Take(requestModel.PageSize)
                    .ToList();

                var productsResponse = new ResponseModel
                {
                    total = enumerable.Count,
                    results = products
                };

                return Ok(productsResponse);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetByIdAsync(int id)
        {
            var product = await _productService.GetProductAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Create(Product product)
        {
            try
            {
                var objProduct = _productService.Create(product);
                product.ProductId = objProduct.ProductId;
                product.DateCreated = DateTime.Now;
                return Ok(product);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Product> Update(Product product)
        {
            try
            {
                var updatedProduct = _productService.Update(product);
                return Ok(updatedProduct);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _logger.LogInformation("Delete", id);
                _productService.Delete(id);
                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }
    }
}