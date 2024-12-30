Here’s a list of **essential Swagger decorators** in NestJS (`@nestjs/swagger`) that are commonly used to document APIs:

---

### **Controller-Level Decorators**

1. **`@ApiTags()`**  
   Groups endpoints under a specific tag in the Swagger UI.
   ```typescript
   @ApiTags('users')
   @Controller('users')
   export class UserController {}
   ```

---

### **Method-Level Decorators**

2. **`@ApiOperation()`**  
   Describes the purpose of an endpoint.

   ```typescript
   @ApiOperation({ summary: 'Get user by ID' })
   @Get(':id')
   getUser(@Param('id') id: string) {}
   ```

3. **`@ApiResponse()`**  
   Documents response types and HTTP status codes.

   ```typescript
   @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.' })
   @ApiResponse({ status: 404, description: 'User not found.' })
   @Get(':id')
   getUser(@Param('id') id: string) {}
   ```

4. **`@ApiProduces()`**  
   Specifies the MIME types the endpoint can produce.

   ```typescript
   @ApiProduces('application/json')
   ```

5. **`@ApiConsumes()`**  
   Specifies the MIME types the endpoint can consume.
   ```typescript
   @ApiConsumes('application/json')
   @Post()
   createUser(@Body() createUserDto: CreateUserDto) {}
   ```

---

### **Parameter-Level Decorators**

6. **`@ApiParam()`**  
   Documents URL parameters in the path.

   ```typescript
   @ApiParam({ name: 'id', required: true, description: 'User ID' })
   @Get(':id')
   getUser(@Param('id') id: string) {}
   ```

7. **`@ApiQuery()`**  
   Documents query parameters.
   ```typescript
   @ApiQuery({ name: 'search', required: false, description: 'Search term' })
   @Get()
   findUsers(@Query('search') search?: string) {}
   ```

---

### **Request Body Decorators**

8. **`@ApiBody()`**  
   Describes the request body format.
   ```typescript
   @ApiBody({
     description: 'User data for creation',
     type: CreateUserDto,
   })
   @Post()
   createUser(@Body() createUserDto: CreateUserDto) {}
   ```

---

### **Security Decorators**

9. **`@ApiBearerAuth()`**  
   Adds a bearer token to the security section of Swagger UI.

   ```typescript
   @ApiBearerAuth()
   @Get('profile')
   getProfile() {}
   ```

10. **`@ApiSecurity()`**  
    Specifies a security scheme for an endpoint.
    ```typescript
    @ApiSecurity('api_key')
    @Get('secure-data')
    getSecureData() {}
    ```

---

### **Model-Related Decorators**

11. **`@ApiProperty()`**  
    Describes properties in DTOs for automatic schema generation.

    ```typescript
    import { ApiProperty } from '@nestjs/swagger';

    export class CreateUserDto {
      @ApiProperty({ description: 'The name of the user' })
      name: string;

      @ApiProperty({ description: 'The email of the user' })
      email: string;
    }
    ```

12. **`@ApiPropertyOptional()`**  
    Marks a property as optional in the schema.
    ```typescript
    @ApiPropertyOptional()
    age?: number;
    ```

---

### **File Upload Decorators**

13. **`@ApiConsumes()`**  
    Specifies the content type for file uploads (e.g., `multipart/form-data`).

    ```typescript
    @ApiConsumes('multipart/form-data')
    ```

14. **`@ApiBody()` (for File Uploads)**  
    Specifies metadata for file upload.
    ```typescript
    @ApiBody({
      description: 'Upload a profile picture',
      type: 'multipart/form-data',
    })
    ```

---

### **General Decorators**

15. **`@ApiExcludeEndpoint()`**  
    Excludes specific endpoints from appearing in the Swagger UI.

    ```typescript
    @ApiExcludeEndpoint()
    @Get('hidden')
    hiddenEndpoint() {}
    ```

16. **`@ApiExcludeController()`**  
    Excludes an entire controller from Swagger documentation.
    ```typescript
    @ApiExcludeController()
    @Controller('internal')
    export class InternalController {}
    ```

---

### **Combining These Decorators**

By using a combination of these decorators, you can create a comprehensive and user-friendly API documentation that includes endpoints, request/response types, query parameters, and security.

Let me know if you’d like more examples for specific use cases!
