# ValdrNG

Angular reactive forms util which generates configuration and validators for constraints.

Inspired by [Valdr for AngularJS](https://github.com/netceteragroup/valdr).

### Built-in validators

* **size** - Validates field size

```typescript
{
  size: {
    min: number;
    max: number;
    message: string;
  }
}
```

* **min** - Minimum numeric value

```typescript
{
  min: {
    value: number;
    message: string;
  }
}
```

* **max** - Maximum numeric value

```typescript
{
  max: {
    value: number;
    message: string;
  }
}
```

* **minLength** - Minimum length of a string

```typescript
{
  minLength: {
    value: number;
    message: string;
  }
}
```

* **maxLength** - Maximum length of a string

```typescript
{
  maxLength: {
    value: number;
    message: string;
  }
}
```

* **email** - Checks for valid e-mail.

```typescript
{
  email: {
    message: string;
  }
}
```

* **pattern** - Validates by the given pattern

```typescript
{
  pattern: {
    value: string;
    message: string;
  }
}
```

* **url** - Checks if the field has valid URL, currently supports urls starting with http, https & ftp.

```typescript
{
  url: {
    message: string;
  }
}
```
