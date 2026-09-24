---
title: C++
description: Core C++ syntax for variables, classes, STL, pointers, templates and exception handling.
---

## Variables

```c++
// Integer types
int number = -10;
unsigned int age = 22;
short shortInt = 6000; // 16 bits
long longInt = 1000000; // 32 bits

cpp// Can be true or false
bool isOverage = age >= 18;

// Floating-point types
float weightKg = 77.8;
double doubleNumber = -9998.0;

char character = 'a';
std::string name = "Anderson Silva"; // needs #include <string>
```

## Classes

```c++
class BaseClass {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b;}
};

class DerivedClass: public Polygon {
  public:
    int area ()
      { return width * height; }
};
```

- `private`: only accessible whitin its defined class.
- `protected`: accessible to derived classes.
- `public`: openly accessible.

## STL containers

### Array

```c++
#include <array>
#include <algorithm>
#include <iostream>

int main() {
    // unused spaces are initialized as 0
    std::array<int, 5> arr = {65, 12, 31};
    std::sort(arr.begin(), arr.end());

    for(int number : arr) {
        std::cout<<number<<" ";
    }
}
```

- `std::array` will be stored on stack.

### Vector

```c++
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {8, 4, 5, 9};
 
    v.push_back(6);
    v.push_back(9);
    
    for (int i = 0; i < v.size(); i++) {
        std::cout << "["<<i<<"] = " << v[i]<<" ";
    }
}
```

- `std::vector` is heap allocated and can change size dinamically.

### Map

```c++
#include <iostream>
#include <map>
#include <string>

void printMap(const std::map<std::string, float>& map) { 
    for(const auto&[key, value] : map) {
        std::cout<<key<<": "<<value<<"\n";
    }
}

int main() {
    std::map<std::string, float> storageMap;

    storageMap["banana"] = 5.0;
    storageMap["rice"] = 10.5;

    printMap(storageMap);
}
```

### Set

```c++
#include <iostream>
#include <set>

void checkElement(const std::set<int> &s, int element) {
    if (s.count(element))
      std::cout << element << " exists in the set\n";
}

int main() {
    std::set<int> s = {10, 11};
    s.insert(12);

    // 12 appears one time, so true!
    checkElement(s, 12);

    s.erase(12);

    // 12 is no longer here, so it won't print
    checkElement(s, 12);
}
```

### Queue

```c++
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;
    for(int i = 0; i < 5;i++) {
        q.push(i); // back pushes i
    }
    
    q.pop(); // removes the first element

    // will keep looping until queue is emptied
    for (; !q.empty(); q.pop()) {
        std::cout << q.front() << ' ';
    }
    // will print: 1 2 3 4
}
```

### Stack

```c++
#include <iostream>
#include <stack>

void printTopElement(const stack<int>& stack) {
    std::cout<<"Top element: "<<s.top() << "\n";
}

int main() {
    std::stack<int> s;

    s.push(1);
    s.push(2);

    // will print: 'Top element: 2'
    printTopElement(s);    

    s.pop(); // removes from the top
    // will print: 'Top element: 1'
    printTopElement(s);
}
```

## Pointers and references

```c++
#include <iostream>

void printArray(const int *array, int size) {
  std::cout << "Array: ";
  for (int i = 0; i < size; i++)
    std::cout << array[i] << " "; // pointers values can be accessed like arrays
  std::cout << "\n";
}

int main() {
    int value = 3;
    int *intPointer =
        &value; // pointer stores the reference (memory address) of 'value'
    std::cout << "Pointer address: " << intPointer << "\n"; // prints the address
    
    // prints the pointer's value: 3
    std::cout << "Pointer value: " << *intPointer << "\n"; 

    // changing the pointer's value also changes the original value
    *intPointer = 5; 
    std::cout << "Value: " << value << "\n"; // prints 'Value: 5'

    int simpleArray[4] = {0, 1, 2, 3};
    // will print: 'Array: 0 1 2 3'
    printArray(simpleArray, 4);
    
    // this will allocate 4 chunks of 4 bytes and return the address for the
    // pointer
    int *cppPointerArray = new int[4];

    for (int i = 0; i < 4; i++)
      cppPointerArray[i] = i;
    
    // will print: 0 1 2 3 
    printArray(cppPointerArray, 4);

    // allocated memory HAS to be freed
    delete[] cppPointerArray;
}

```

```c++
#include <iostream>
#include <vector>

// the reference makes it so the function doesn't have to make a copy of the
// vector to print it out
// const indicates the contents of the vector aren't changed here
void printVector(const std::vector<int> &vec) {
    std::cout << "Vector: ";
    for (const int x : vec)
      std::cout << x << " ";
    std::cout << "\n";
}

int main() {
    int a = 5;
    // ref's memory address is the same as a's without it explicitly being
    // passed like with a pointer
    int &ref = a;
    // changing the value of the address also doesn't need a explicit symbol like
    // the pointer's '*' symbol
    ref = 10; // this chenges a's value to 10

    std::vector<int> v = {8, 4, 5, 9};
    // a reference doens't have to be explicitly passed to a function
    printVector(v);
}
```

## Smart pointers

```c++
#include <iostream>
#include <memory>

class Vertex {
private:
    float x, y, z;

public:
    Vertex(int x, int y, int z) : x(x), y(y), z(z) {}
    int getX() const { return x; }
    int getY() const { return y; }
    int getZ() const { return z; }

    void printVertex() {
      std::cout << "Vertex values -> x: " << x << ", y: " << y << " z: " << z
                << "\n";
    }
};

void printVertexSum(const Vertex &vertex) {
    int sum = vertex.getX() + vertex.getY() + vertex.getZ();
    std::cout << "Vertex sum: " << sum << "\n";
}

int main() {
    std::unique_ptr<Vertex> vertex1(new Vertex(1, 1, 1));

    vertex1->printVertex();

    // passing by reference needs the '*' symbol
    printVertexSum(*vertex1);

    // memory allocated to smart pointers doesn't need to be manually freed!
}
```

- `.reset()` can be used to manually free the memory before it leaves the scope.
- you can also use `std::shared_pointer` for multiple owners,the memory is freed after all leave their scopes.
- `std::weak_pointer` can be used if you don't want to prevent the memory from being freed.

## Templates

```c++
#include <iostream>

template <typename T> 
T arraySum(T *arr, int n) {
    T sum = 0;
    for (int i = 0; i < n; i++) {
      sum += arr[i];
    }
    return sum;
}

int main() {
    float arr[] = {1.44, 2.3, 3.1111, 4.76, 5.009, 6.124};
    int i_arr[] = {1, 3, 4};
    double d_arr[] = {4.4343243243243, 3.5324524432};

    float sum = arraySum(arr, 6);
    int sum_i = arraySum(i_arr, 3);
    float sum_d = arraySum(d_arr, 2);
    std::cout << sum << "\n";
    std::cout << sum_i << "\n";
    std::cout << sum_d << "\n";

    return 0;
}
```

## Exception handling

```c++
#include <iostream>
#include <stdexcept>

void safeSelectFromArray(const int array[], int i, int size) {
    if (i >= size) {
      throw std::runtime_error(
          "Attempted to select number outside of the array!");
    }
    // ...
}

int main() {
    int array[2] = {0, 1};

    try {
      safeSelectFromArray(array, 3, 2);
    } catch (const std::runtime_error &e) {
      std::cerr << e.what() << std::endl;
    }
}

```

## References

- [cplusplus Reference](https://cplusplus.com/reference/)
- [Cpp Reference](https://www.cppreference.com/)
- [Microsoft Ignite](https://learn.microsoft.com/cpp/cpp/smart-pointers-modern-cpp?view=msvc-170)
