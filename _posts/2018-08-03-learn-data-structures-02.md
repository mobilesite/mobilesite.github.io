---
layout: post
title: '数据结构学习笔记（二）——动态数组'
subtitle: ''
date: 2018-08-03 23:59:02
author: 'Paian'
catalog: true
tags:
  - 动态数组
  - 数据结构
  - java
---

### 一、使用 Java 中的数组

数组的索引可以是有语意的，也可以是没有语意的。

数组最大的优点：快速查询。例如：score[2]。

数组最好应用于“索引有语意”的情况。当索引没有语意的时候，有可能会使用别的数据结构更好。
但并非所有有语意的索引都适用于数组。比如，身份证号就不适合做索引，因为这样的话就需要为此开辟一个巨大的空间来存储这个数组，而且这个数组有很多项是没有用的，浪费掉了。

### 二、二次封装属于我们自己的数组

```java
public class Array {
  private int[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    data = new int[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }
}
```

### 三、向数组中添加元素

1、向数组末尾添加元素

因为 size 实际上是指向数组中第一个没有元素的位置，所以要向数组中添加元素就是将数组的下标为 size 的那项赋值，赋值完后别忘了更新 size，另外，插入之前需要判定一下数组的容量是否已经达到最大值。

2、向数组中某个位置 i 插入一个元素

只需要将从位置 i（含）到数组末尾的所有元素往后移动一位，然后在位置 i 处插入该元素。具体移动的时候，需要注意从最后一个元素开始依次后移。

```java
public class Array {
  private int[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    data = new int[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组末尾添加一个元素
  public void addLast(int e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(int e) {
    add(size, 0);
  }

  // 向数组中指定位置index处插入一个元素
  public void add(e) {
    if(size == data.length) {
      throw new IllegalArgumentException('add failed. array is full');
    }
    if(index < 0 || index > size){
      throw nee IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }
}
```

### 四、数组中查询元素和修改元素

Array.java

```java
public class Array {
  private int[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    data = new int[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组末尾添加一个元素
  public void addLast(int e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(int e) {
    add(size, 0);
  }

  // 向数组中指定位置index处插入一个元素
  public void add(int index, int e) {
    if(size == data.length) {
      throw new IllegalArgumentException('add failed. array is full');
    }
    if(index < 0 || index > size){
      throw new IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }

  // 获取index索引位置的元素
  public int get(int index) {
    if (index < 0 || index >= size) {
    throw new IllegalArgumentException('get failed. Index is illegal');
      return data[index];
    }
  }

  // 改变index索引位置的元素
  public void set(int index, int e) {
    if(index < 0 || index >= size) {
      throw new IllegalArgumentException('set failed. Index is illegal');
    }
    data[index] = e;
  }

  @Override
  public String toString(){
    StringBuilder res = new StringBuilder();
    res.append(String.format('Array: size = %d, capacity = %d\n', size, data.length));
    res.append('[');
    for(int i = 0; i < size; i++) {
      res.append(data[i]);
      if(i != size -1){
        res.append(', ');
      }
    }
    res.append(']');
    return res.toString();
  }
}
```

Main.java

```java
public class Main {
  public static void main(String[] args) {
    Array arr = new Array(20);
      for(int i = 0; i < 10; i++) {
      arr.addLast(i);
    }
    System.out.println(arr);

    arr.add(1, 100);
    System.out.println(arr);

    arr.addFirst(-1);
    System.out.println(arr);
  }
}
```

### 五、数组的包含、搜索和删除

Array.java

```java
public class Array {
  private int[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    data = new int[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组末尾添加一个元素
  public void addLast(int e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(int e) {
    add(size, 0);
  }

  // 向数组中指定位置index处插入一个元素
  public void add(int index, int e) {
    if(size == data.length) {
      throw new IllegalArgumentException('add failed. array is full');
    }
    if(index < 0 || index > size){
      throw new IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }

  // 获取index索引位置的元素
  public int get(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('get failed. Index is illegal');
      return data[index];
    }
  }

  // 改变index索引位置的元素
  public void set(int index, int e) {
    if(index < 0 || index >= size) {
      throw new IllegalArgumentException('set failed. Index is illegal');
    }
    data[index] = e;
  }

  // 查找数组中是否有元素e
  public boolean contains(int e){
    for(int i = 0; i < size; i ++) {
      if(data[i] == e) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  public int find(int e) {
    for(int i = 0; i < size; i++) {
      if(data[i] == e) {
        return i;
      }
    }
    return -1;
  }

  // 从数组中删除索引为index的元素，并且返回该元素
  public int remove(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('remove failed. Index is illegal');
    }
    int ret = data[index];

    for(int i = index + 1; i < size; i++) {
      data[i - 1] = data[i]
    }
    size--;
    return ret;
  }

  // 从数组中删除第一个元素，返回删除的元素
  public int removeFirst() {
    return remove(0);
  }

  // 从数组中删除最后一个元素，返回删除的元素
  public int removeLast() {
    return remove(size - 1);
  }

  // 从数组中删除元素e
  public void removeElement(int e) {
    int index = find(e);

    if(index != -1) {
      remove(index);
    }
  }

  @Override
  public String toString(){
    StringBuilder res = new StringBuilder();
    res.append(String.format('Array: size = %d, capacity = %d\n', size, data.length));
    res.append('[');
    for(int i = 0; i < size; i++) {
      res.append(data[i]);
      if(i != size -1){
        res.append(', ');
      }
    }
    res.append(']');
    return res.toString();
  }
}
```

Main.java

```java
public class Main {
  public static void main(String[] args) {
    Array arr = new Array(20);
    for(int i = 0; i < 10; i++) {
      arr.addLast(i);
    }
    System.out.println(arr);

    arr.add(1, 100);
    System.out.println(arr);

    arr.addFirst(-1);
    System.out.println(arr);

    arr.remove(2);
    System.out.println(arr);

    arr.removeElement(4);
    System.out.println(arr);
  }
}
```

值得注意的是，上述的 removeElement(int e)方法还可以再改造一下，如果删除了指定的元素，返回一个 boolean 值，从而知道是否删除成功。另外，上述的 removeElement(int e)实际上只删除了数组中第一个被找到的 e 元素，所以，当数组中有多个 e 元素时，如果想删除所有的 e 元素的话，需要你自己再设计一个方法 removeAllElement(int e)来实现这一功能。同样，对于 find(int e)也是一样的，只会找到一个，如果想把数组中所有的元素 e 都找出来，可以设计一个 findAllElement(int e)。

### 六、使用泛型

目前为止，这个数组类最大的问题是只能承载 int 类型的数据。使用泛型，让我们的数据结构可以放置“任何”数据类型。不过，在 Java 中，一个泛型类是不可以放置基本数据类型的（Java 中的基本数据类型有 boolean、byte、char、short、int、long、float、double），而只能是类对象。为了解决这个问题，Java 中为每一个基本数据类型都设计了一个对应的包装类，把本来不是类对象的那 8 种数据类型进行了包装，成了一个个的包装类：Boolean、Byte、Char、Short、Int、Long、Float、Double。而且，基本类型和其对应的包装类之间在需要的时候可以自动地进行互相转换。下面，我们就使用泛型来对我们上面实现的数组类进行改造：

Array.java

```java
public class Array<E> {
  private E[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    // 值得注意的是，Java中不支持直接new一个泛型数组，而是应该先new Object类型的数组，然后再进行强制类型转换，转换成泛型E类型数组。在Java中，任意类都是Object类的子类。
    data = (E[])new Object[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组中指定位置index处插入一个元素
  public void add(int index, E e) {
    if(size == data.length) {
      throw new IllegalArgumentException('add failed. array is full');
    }
    if(index < 0 || index > size){
      throw new IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }

  // 向数组末尾添加一个元素
  public void addLast(E e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(E e) {
    add(size, 0);
  }

  // 获取index索引位置的元素
  public E get(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('get failed. Index is illegal');
      return data[index];
    }
  }

  // 改变index索引位置的元素
  public void set(int index, E e) {
    if(index < 0 || index >= size) {
      throw new IllegalArgumentException('set failed. Index is illegal');
    }
    data[index] = e;
  }

  // 查找数组中是否有元素e
  public boolean contains(E e){
    for(int i = 0; i < size; i ++) {
      if(data[i].equals(e)) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  public int find(E e) {
    for(int i = 0; i < size; i++) {
      if(data[i].equals(e)) {
        return i;
      }
    }
    return -1;
  }

  // 从数组中删除索引为index的元素，并且返回该元素
  public E remove(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('remove failed. Index is illegal');
    }
    int ret = data[index];

    for(int i = index + 1; i < size; i++) {
      data[i - 1] = data[i]
    }
    size--;
    data[size] = null; // 促进垃圾回收，loitering objects
    return ret;
  }

  // 从数组中删除第一个元素，返回删除的元素
  public E removeFirst() {
    return remove(0);
  }

  // 从数组中删除最后一个元素，返回删除的元素
  public E removeLast() {
    return remove(size - 1);
  }

  // 从数组中删除元素e
  public void removeElement(E e) {
    int index = find(e);

    if(index != -1) {
      remove(index);
    }
  }

  @Override
  public String toString(){
    StringBuilder res = new StringBuilder();
    res.append(String.format('Array: size = %d, capacity = %d\n', size, data.length));
    res.append('[');
    for(int i = 0; i < size; i++) {
      res.append(data[i]);
      if(i != size -1){
        res.append(', ');
      }
    }
    res.append(']');
    return res.toString();
  }
}
```

Main.java

```java
public class Main {
public static void main(String[] args) {
Array<Integer> arr = new Array<>(20); // 告诉泛型中使用什么类型
// 相当于Array<Integer> arr = new Array<Integer>(20);  只不过新的Java语法中，new Array<Integer>中的Integer可以省略了
for(int i = 0; i < 10; i++) {
arr.addLast(i);
}
System.out.println(arr);

arr.add(1, 100);
System.out.println(arr);

arr.addFirst(-1);
System.out.println(arr);

arr.remove(2);
System.out.println(arr);

arr.removeElement(4);
System.out.println(arr);

arr.removeFirst();
System.out.println(arr);
}
}
```

现在，我们这个类就可以支持不同数据类型的数据了，包括自定义的类型。

Student.java

```java
public class Student {
  private String name;
  private int score;
  public Student(String studentName, int studentScore) {
    name = studentName;
    score = studentScore;
  }

  @Override
  public String toString() {
    return String.format('Student(name: %s, score: %d)', name, score);
  }

  public static void main() {
    Array<Student> arr = new Array<>();
    arr.addLast(new Student('Lilei', 100));
    arr.addLast(new Student('Hanmeimei', 90));
    arr.addLast(new Student('Tom', 88));
  }
}
```

### 七、动态数组：让数组的容量可伸缩

上面我们实现的这个数组类还存在一个问题，那就是里面用到的数据是静态的数组，即数组的容量是在创建时指定的。有的时候，我们在程序开始时想声明一个容量比较小的数组，随着程序运行，发现数组的容量不够用了，就需要动态地扩容，可是这对于静态数组来说是做不到的。那么，怎么解决这个问题呢？思路是再创建一个容量更大的数组，然后把原数组中的元素都迁移到新建的这个容量更大的数组上去。

同样地，对于数组的删除操作，我们也可以动态地来减小数组容量来节省对于空间的占用。
现在，我们就来实现数组类的动态扩容：

Array.java

```java
public class Array<E> {
  private E[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    // 值得注意的是，Java中不支持直接new一个泛型数组，而是应该先new Object类型的数组，然后再进行强制类型转换，转换成泛型E类型数组。在Java中，任意类都是Object类的子类。
    data = (E[])new Object[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组中指定位置index处插入一个元素
  public void add(int index, E e) {
    if(index < 0 || index > size){
      throw new IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }
    if(size == data.length) {
      resize(2 * data.length);
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }

  // 向数组末尾添加一个元素
  public void addLast(E e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(E e) {
    add(size, 0);
  }

  // 获取index索引位置的元素
  public E get(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('get failed. Index is illegal');
      return data[index];
    }
  }

  // 改变index索引位置的元素
  public void set(int index, E e) {
    if(index < 0 || index >= size) {
      throw new IllegalArgumentException('set failed. Index is illegal');
    }
    data[index] = e;
  }

  // 查找数组中是否有元素e
  public boolean contains(E e){
    for(int i = 0; i < size; i ++) {
      if(data[i].equals(e)) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  public int find(E e) {
    for(int i = 0; i < size; i++) {
      if(data[i].equals(e)) {
        return i;
      }
    }
    return -1;
  }

  // 从数组中删除索引为index的元素，并且返回该元素
  public E remove(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('remove failed. Index is illegal');
    }
    int ret = data[index];

    for(int i = index + 1; i < size; i++) {
      data[i - 1] = data[i]
    }
    size--;
    data[size] = null; // 促进垃圾回收，loitering objects

    if(size == data.length / 2 && data.length/2 != 0) { // 第二个条件是为了缩容的时候不至于缩成容量为0
      resize( data.length / 2);
    }
    return ret;
  }

  // 从数组中删除第一个元素，返回删除的元素
  public E removeFirst() {
    return remove(0);
  }

  // 从数组中删除最后一个元素，返回删除的元素
  public E removeLast() {
    return remove(size - 1);
  }

  // 从数组中删除元素e
  public void removeElement(E e) {
    int index = find(e);

    if(index != -1) {
      remove(index);
    }
  }

  @Override
  public String toString(){
    StringBuilder res = new StringBuilder();
    res.append(String.format('Array: size = %d, capacity = %d\n', size, data.length));
    res.append('[');
    for(int i = 0; i < size; i++) {
      res.append(data[i]);
    if(i != size -1){
      res.append(', ');
      }
    }
    res.append(']');
    return res.toString();
  }

  // 对数组的容量进行调整
  private void resize(int newCapacity){
    E[] newData = (E[])new Object[newCapacity];

    for (int i = 0; i < size; i++) {
      newData[i] = data[i];
    }
    data = newData;
  }
}
```

Main.java

```java
public class Main {
  public static void main(String[] args) {
    Array<Integer> arr = new Array<>(); // 告诉泛型中使用什么类型
    // 相当于Array<Integer> arr = new Array<Integer>(20);  只不过新的Java语法中，new Array<Integer>中的Integer可以省略了
    for(int i = 0; i < 10; i++) {
      arr.addLast(i);
    }
    System.out.println(arr);

    arr.add(1, 100);
    System.out.println(arr);

    arr.addFirst(-1);
    System.out.println(arr);

    arr.remove(2);
    System.out.println(arr);

    arr.removeElement(4);
    System.out.println(arr);

    arr.removeFirst();
    System.out.println(arr);
  }
}
```

### 八、简单的时间复杂度分析

简单地说，大 O 描述的是算法的运行时间和输入数据之间的关系。

```java
public static int sum(int[] nums) {
  int sum = 0;
  for(int num: nums) {
    sum + = num
  };
  return sum;
}
```

对于这样一个函数，我们说他的复杂度是 O(n)，n 是 nums 中的元素的个数。算法和 n 呈线性关系。
为什么还要加个大 O，叫做 O(n)？因为忽略常数。实际上，这个算法的实际时间应该是这样一个函数：
T = c1 \* n + c2
n 是数组 nums 中元素的个数。
在开始的时候需要初始化 nums 和 sum 这两个空间，最后还得 return sum，这些时间是 c2，c1 则是每次 for 循环时需要进行取 num、取 sum、对 sum 与 num 进行相加等操作导致的运算倍数。

所以，对于 T = 2 _ n +2 和 T = 2000 _ n + 10000 ，都叫做 O(n)。

不过，对于 O(n^2) 和 O(n)复杂度的两个算法来说，最终真实的执行时间与输入数据的量是由相关性的，对于 O(n^2)的算法，如果你所输入一个规模超小的数据，其执行时间可能会比 O(n)的算法输入一个超大的数据要实际完成得更快。
注：对于比较小的数组，可以用插入排序来代替归并排序和快速排序，从而获得性能上 10-15%的性能提升。利用的插入排序算法的常数比归并排序和快速排序要小的特点。

实际上，O(n^2) 和 O(n)等等 都叫做渐进时间复杂度，其意义更在于当 n 趋近于无穷大的时候，两个算法谁快谁慢。

接下来我们分析一下上面我们创建的数组类的一些操作的时间复杂度：

添加操作：

addLast(e) O(1)
addFirst(e) O(n)
add(index, e) O(n) (严格计算需要一些概率论的知识)

另外，对于添加的操作，如果数组容量已经满了的话，需要有一个 resize 操作，即把原数组中的元素整个迁移到新数组上，这个复杂度是 O(n)的。
所以，综合考虑最坏的情况，添加操作的时间复杂度是 O(n)。

删除操作：
removeLast() O(1)
removeFirst() O(n)
remove(index, e) O(n)

resize O(n)

所以，删除操作的时间复杂度也是 O(n)。

修改操作：
set(index, e) O(1)
所以，如果你知道索引，修改操作的时间复杂度是 O(1)，这是数组非常大的一个优势。
如果不知道索引，那就需要先查找，结合后面查找的复杂度分析，可知是 O(n)

查询操作：
get(index) O(1)
contains(e) O(n)
find(e) O(n)

综上所述，对于我们实现的这个动态数组类：
增、删的时间复杂度： O(n)
改、查的时间复杂度：已知索引的情况下是 O(1)，未知索引的情况下是 O(n)

### 九、均摊复杂度和防止复杂度的震荡

上面，我们分析过数组添加的时间复杂度，如果在末尾添加的时候，时间复杂度是 O(1)，但是考虑到 resize 的操作的时间复杂度是 O(n)，所以时间复杂度是 O(n)。

但实际上，并不是每一次添加操作之后，都需要执行 resize 操作的。
假设 capacity = n, n + 1 次 addLast 操作触发一次 resize 操作（一次 resize 操作是 n 次基本操作），即总共进行 2n + 1 次基本操作。用 2n + 1 除以 n+1 得到平均每次 addLast 操作需要执行 2 次基本操作。
所以，这样均摊计算得到的时间复杂度是 O(1)。在这个例子中，这种均摊计算的结果比只考虑最坏情况的结果更有意义，因为最坏的情况隔着很多次之后才出现一次。

像上面这样均摊计算得到的复杂度称为均摊复杂度（amortized time complexity）。

但是，考虑一种特殊情况，假设数组的容量是 n，那么我们再执行一次 addLast 的时候，要执行一次扩容，所以时间复杂度是 O(n)，然后我们再执行一次 removeLast，这时候需要执行缩容，时间复杂度是 O(n)，紧接着再执行一次 addLast，由于又需要扩容，所以时间复杂度依然是 O(n)，如此循环往复，即这种特殊情况的时间复杂度稳定的都是 O(n)。这与上面我们计算得到的通常情况的均摊时间复杂度 O(1)形成鲜明的对照。我们称这种现象叫做时间复杂度震荡。

究其原因，是我们上面的算法策略缩容的时候缩得过着急了（Eager），我们可以改进一下，即当元素到容量的 1/2 时，不直接进行缩容，而是等到当元素被删到只剩下容量 1/4 的时候，再进行缩容。而且缩容的时候，每次只缩至容量的 1/2（而不直接缩成容量的 1/4）。所以，这是一种 lazy 缩容的策略。

这样就避免了震荡。

这种懒的策略，是非常有意思的。在算法中，还有其它情景也可以考虑懒的策略。

现在，我们对上面的动态数组类进行一下改写，以避免复杂度震荡。

Array.java

```java
public class Array<E> {
  private E[] data;
  private int size; // 数组中元素的个数

  // 构造函数，传入数组的容量capacity构造Array
  public Array(int capacity) {
    // 值得注意的是，Java中不支持直接new一个泛型数组，而是应该先new Object类型的数组，然后再进行强制类型转换，转换成泛型E类型数组。在Java中，任意类都是Object类的子类。
    data = (E[])new Object[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array(){
    this(10);
  }

  // 获取数组中的元素个数
  public int getSize(){
    return size;
  }

  // 获取数组的容量
  public getCapacity(){
    return data.length;
  }

  // 获取数组是否为空
  public boolean isEmpty(){
    return size == 0;
  }

  // 向数组中指定位置index处插入一个元素
  public void add(int index, E e) {
    if(index < 0 || index > size){
      throw new IllegalArugumentException('add failed. Require index >= 0 and index <= size');
    }
    if(size == data.length) {
      resize(2 * data.length);
    }

    for(int i = size - 1; i >= index; i--) {
      data[i+1] = data[i];
    }
    data[index] = e;
    size++;
  }

  // 向数组末尾添加一个元素
  public void addLast(E e) {
    add(size, 0);
  }

  // 在数组的最开头加入一个新元素
  public void addFirst(E e) {
    add(size, 0);
  }

  // 获取index索引位置的元素
  public E get(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('get failed. Index is illegal');
      return data[index];
    }
  }

  // 改变index索引位置的元素
  public void set(int index, E e) {
    if(index < 0 || index >= size) {
      throw new IllegalArgumentException('set failed. Index is illegal');
    }
    data[index] = e;
  }

  // 查找数组中是否有元素e
  public boolean contains(E e){
    for(int i = 0; i < size; i ++) {
      if(data[i].equals(e)) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  public int find(E e) {
    for(int i = 0; i < size; i++) {
      if(data[i].equals(e)) {
        return i;
      }
    }
    return -1;
  }

  // 从数组中删除索引为index的元素，并且返回该元素
  public E remove(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException('remove failed. Index is illegal');
    }
    int ret = data[index];

    for(int i = index + 1; i < size; i++) {
      data[i - 1] = data[i]
    }
    size--;
    data[size] = null; // 促进垃圾回收，loitering objects

    if(size == data.length / 4  && data.length/2 != 0 ) {
      resize( data.length / 2);
    }
    return ret;
  }

  // 从数组中删除第一个元素，返回删除的元素
  public E removeFirst() {
    return remove(0);
  }

  // 从数组中删除最后一个元素，返回删除的元素
  public E removeLast() {
    return remove(size - 1);
  }

  // 从数组中删除元素e
  public void removeElement(E e) {
    int index = find(e);

    if(index != -1) {
      remove(index);
    }
  }

  @Override
  public String toString(){
    StringBuilder res = new StringBuilder();
    res.append(String.format('Array: size = %d, capacity = %d\n', size, data.length));
    res.append('[');
    for(int i = 0; i < size; i++) {
      res.append(data[i]);
      if(i != size -1){
        res.append(', ');
      }
    }
    res.append(']');
    return res.toString();
  }

  // 对数组的容量进行调整
  private void resize(int newCapacity){
    E[] newData = (E[])new Object[newCapacity];
    for (int i = 0; i < size; i++) {
      newData[i] = data[i];
    }
    data = newData;
  }
}
```

Main.java

```java
public class Main {
  public static void main(String[] args) {
    Array<Integer> arr = new Array<>(); // 告诉泛型中使用什么类型
    // 相当于Array<Integer> arr = new Array<Integer>(20);  只不过新的Java语法中，new Array<Integer>中的Integer可以省略了
    for(int i = 0; i < 10; i++) {
      arr.addLast(i);
    }
    System.out.println(arr);

    arr.add(1, 100);
    System.out.println(arr);

    arr.addFirst(-1);
    System.out.println(arr);

    arr.remove(2);
    System.out.println(arr);

    arr.removeElement(4);
    System.out.println(arr);

    arr.removeFirst();
    System.out.println(arr);
  }
}
```
